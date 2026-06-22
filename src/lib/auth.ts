/**
 * NextAuth v5 setup — single Credentials provider (email + password).
 *
 *  - Passwords are bcrypt-hashed in the `users` table.
 *  - Session is JWT in a cookie; no DB-backed session table.
 *  - Role (`admin` | `editor`) is stuffed into the session for use by
 *    middleware and Server Actions.
 *
 * Splits into:
 *   - `auth.config.ts` — Edge-safe shared config (loaded by middleware).
 *   - this file       — full config with Credentials + Drizzle (loaded by
 *                       Node-runtime entry points only).
 */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db, schema } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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

        // Fire-and-forget last_login_at bump — don't gate sign-in on it.
        db.update(schema.users)
          .set({ lastLoginAt: new Date() })
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
