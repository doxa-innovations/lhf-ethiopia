import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/lib/db";

export const metadata = { title: "Your account" };

type Search = { ok?: string; error?: string };

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login?from=/admin/account");
  const sp = await searchParams;
  const userId = Number((session.user as { id?: string | number }).id);

  async function changePassword(formData: FormData) {
    "use server";
    const current = String(formData.get("current") ?? "");
    const next = String(formData.get("next") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (!current || !next || !confirm) {
      redirect("/admin/account?error=missing");
    }
    if (next.length < 8) {
      redirect("/admin/account?error=too_short");
    }
    if (next !== confirm) {
      redirect("/admin/account?error=mismatch");
    }
    if (current === next) {
      redirect("/admin/account?error=same");
    }

    const rows = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);
    const user = rows[0];
    if (!user) redirect("/admin/account?error=missing_user");

    const ok = await bcrypt.compare(current, user.passwordHash);
    if (!ok) redirect("/admin/account?error=wrong_current");

    const hash = await bcrypt.hash(next, 10);
    await db
      .update(schema.users)
      .set({ passwordHash: hash })
      .where(eq(schema.users.id, userId));

    redirect("/admin/account?ok=1");
  }

  const errorMessage =
    sp.error === "missing"
      ? "Fill in all three fields."
      : sp.error === "too_short"
        ? "New password must be at least 8 characters."
        : sp.error === "mismatch"
          ? "New password and confirmation don't match."
          : sp.error === "same"
            ? "New password must be different from your current one."
            : sp.error === "wrong_current"
              ? "Current password is incorrect."
              : sp.error === "missing_user"
                ? "Couldn't find your account. Sign out and back in."
                : null;

  return (
    <div style={{ padding: "44px 36px", maxWidth: 560 }}>
      <span
        style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgb(var(--brand, 159 31 42))",
        }}
      >
        Account
      </span>
      <h1
        style={{
          fontFamily: "var(--font-garamond)",
          fontSize: 30,
          fontWeight: 500,
          color: "rgb(var(--ink, 18 22 32))",
          marginTop: 10,
        }}
      >
        Hello, {session.user.name ?? session.user.email}
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "rgb(var(--ink-muted, 88 96 110))",
          lineHeight: 1.6,
          maxWidth: 480,
        }}
      >
        Signed in as <strong>{session.user.email}</strong>. Change your
        password below — pick something at least 8 characters that you
        haven't used before.
      </p>

      {sp.ok ? (
        <div
          role="status"
          style={{
            marginTop: 20,
            padding: "10px 14px",
            background: "rgba(46, 142, 142, 0.16)",
            color: "rgb(46, 142, 142)",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Password updated.
        </div>
      ) : null}
      {errorMessage ? (
        <div
          role="alert"
          style={{
            marginTop: 20,
            padding: "10px 14px",
            background: "rgb(var(--brand-muted, 247 232 232))",
            color: "rgb(var(--brand-strong, 127 24 33))",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          {errorMessage}
        </div>
      ) : null}

      <form
        action={changePassword}
        style={{ marginTop: 22, display: "grid", gap: 14, maxWidth: 380 }}
      >
        <Field label="Current password" name="current" />
        <Field label="New password" name="next" minLength={8} />
        <Field label="Confirm new password" name="confirm" minLength={8} />
        <button
          type="submit"
          style={{
            marginTop: 4,
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
          Change password
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  minLength,
}: {
  label: string;
  name: string;
  minLength?: number;
}) {
  return (
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
        {label}
      </span>
      <input
        type="password"
        name={name}
        required
        minLength={minLength}
        autoComplete="new-password"
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
  );
}
