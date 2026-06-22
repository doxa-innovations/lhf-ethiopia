/**
 * Edge-safe slice of the NextAuth config. Importable from middleware.ts —
 * no DB clients, no Node built-ins. The Credentials provider with its
 * Drizzle lookup lives in the full config (`./auth.ts`), which is loaded
 * only from Node-runtime entry points (route handlers, server actions).
 */
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/admin/login" },
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
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
  providers: [],
};
