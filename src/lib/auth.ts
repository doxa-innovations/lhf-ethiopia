/**
 * NextAuth v5 setup — single Credentials provider (email + password).
 *
 *  - Passwords are bcrypt-hashed in the `users` table.
 *  - Session is JWT in a cookie; no DB-backed session table.
 *  - Role (`admin` | `editor`) is stuffed into the session for use by
 *    middleware and Server Actions.
 *
 * Export `auth()` for Server Components / actions, and the route
 * handlers `GET, POST` for `/api/auth/[...nextauth]/route.ts`.
 */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db, schema } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: { signIn: "/admin/login" },
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 days
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id?: string }).id;
        token.role = (user as { role?: string }).role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const rows = await db
          .select()
          .from(schema.users)
          .where(eq(schema.users.email, email))
          .limit(1);
        const user = rows[0];
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        // Update last_login_at (fire-and-forget, don't gate sign-in on this)
        db.update(schema.users)
          .set({ lastLoginAt: new Date().toISOString() })
          .where(eq(schema.users.id, user.id))
          .catch(() => {});

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
