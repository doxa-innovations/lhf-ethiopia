import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div style={{ padding: "44px 36px", maxWidth: 640 }}>
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
        404 · Admin
      </span>
      <h1
        style={{
          fontFamily: "var(--font-garamond)",
          fontSize: 32,
          fontWeight: 500,
          marginTop: 10,
        }}
      >
        That admin page doesn't exist.
      </h1>
      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.6,
          color: "rgb(var(--ink-muted, 88 96 110))",
          marginTop: 4,
        }}
      >
        Use the sidebar to navigate to an editor, or jump straight back to
        the dashboard.
      </p>
      <Link
        href="/admin"
        style={{
          display: "inline-block",
          marginTop: 18,
          padding: "10px 18px",
          borderRadius: 10,
          background: "rgb(var(--brand, 159 31 42))",
          color: "white",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 13.5,
        }}
      >
        Back to dashboard
      </Link>
    </div>
  );
}
