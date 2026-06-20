/* /admin/login — credentials form. Posts to NextAuth's Credentials
 * provider via the signIn server action. */
import Link from "next/link";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

type Search = { from?: string; error?: string };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const from = sp.from && sp.from.startsWith("/admin") ? sp.from : "/admin";

  async function login(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch {
      redirect(`/admin/login?error=invalid&from=${encodeURIComponent(from)}`);
    }
    redirect(from);
  }

  return (
    <div
      style={{
        background: "white",
        border: "1px solid rgb(var(--border, 226 222 215))",
        borderRadius: 18,
        padding: 36,
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 10px 32px -10px rgba(18, 22, 32, 0.18)",
      }}
    >
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "rgb(var(--ink, 18 22 32))",
          textDecoration: "none",
          marginBottom: 24,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 30,
            height: 30,
            backgroundImage: 'url("/lhflogo.png")',
            backgroundSize: "auto 100%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "EB Garamond, serif",
            fontSize: 17,
            fontWeight: 600,
            color: "rgb(var(--navy, 30 42 71))",
          }}
        >
          LHF Ethiopia
        </span>
      </Link>
      <h1
        style={{
          fontFamily: "EB Garamond, serif",
          fontSize: 28,
          fontWeight: 500,
          margin: 0,
          letterSpacing: "-0.014em",
          color: "rgb(var(--ink, 18 22 32))",
        }}
      >
        Sign in to edit
      </h1>
      <p
        style={{
          fontSize: 13.5,
          color: "rgb(var(--ink-muted, 88 96 110))",
          marginTop: 6,
        }}
      >
        Editors only. Ask the IT manager if you need an account.
      </p>

      {sp.error ? (
        <div
          style={{
            marginTop: 18,
            padding: "10px 14px",
            background: "rgb(var(--brand-muted, 247 232 232))",
            color: "rgb(var(--brand-strong, 127 24 33))",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Wrong email or password. Try again.
        </div>
      ) : null}

      <form action={login} style={{ marginTop: 22, display: "grid", gap: 14 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgb(var(--ink-muted, 88 96 110))",
            }}
          >
            Email
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            autoFocus
            style={{
              padding: "11px 14px",
              borderRadius: 10,
              border: "1.5px solid rgb(var(--border-strong, 200 194 184))",
              fontSize: 14,
              fontFamily: "inherit",
              color: "rgb(var(--ink))",
              outline: "none",
            }}
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgb(var(--ink-muted, 88 96 110))",
            }}
          >
            Password
          </span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            style={{
              padding: "11px 14px",
              borderRadius: 10,
              border: "1.5px solid rgb(var(--border-strong, 200 194 184))",
              fontSize: 14,
              fontFamily: "inherit",
              color: "rgb(var(--ink))",
              outline: "none",
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            marginTop: 6,
            padding: "12px 18px",
            background: "rgb(var(--brand, 159 31 42))",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
