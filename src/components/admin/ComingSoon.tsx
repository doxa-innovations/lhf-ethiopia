import Link from "next/link";

/**
 * Placeholder shown for admin sections that are wired into the sidebar
 * but not yet built. Keeps users out of a 404 and gives them a hint
 * about where the matching strings are editable in the meantime.
 */
export function ComingSoon({
  title,
  description,
  alternative,
}: {
  title: string;
  description: string;
  alternative?: { href: string; label: string };
}) {
  return (
    <div style={{ padding: "44px 36px", maxWidth: 720 }}>
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
        Coming soon
      </span>
      <h1
        style={{
          fontFamily: "var(--font-garamond)",
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "rgb(var(--ink, 18 22 32))",
          marginTop: 10,
          marginBottom: 8,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 15,
          color: "rgb(var(--ink-muted, 88 96 110))",
          lineHeight: 1.6,
          maxWidth: 580,
        }}
      >
        {description}
      </p>
      {alternative ? (
        <div style={{ marginTop: 24 }}>
          <Link
            href={alternative.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 10,
              background: "rgb(var(--brand, 159 31 42))",
              color: "white",
              fontWeight: 600,
              fontSize: 13.5,
              textDecoration: "none",
            }}
          >
            {alternative.label} →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
