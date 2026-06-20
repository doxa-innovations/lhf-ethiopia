/* Welcome card + quick stats shown above Payload's default dashboard.
 * Server Component — counts come straight from the Local API. */
import { getLocalPayload } from "@/lib/payload";

async function getStats() {
  const payload = await getLocalPayload();
  const [news, projects, events, publications, languages, users] = await Promise.all([
    payload.count({ collection: "news" }),
    payload.count({ collection: "projects" }),
    payload.count({ collection: "events" }),
    payload.count({ collection: "publications" }),
    payload.count({ collection: "languages" }),
    payload.count({ collection: "users" }),
  ]);
  const upcoming = await payload.count({
    collection: "events",
    where: { eventPhase: { equals: "Upcoming" } },
  });
  return {
    total:
      news.totalDocs +
      projects.totalDocs +
      events.totalDocs +
      publications.totalDocs +
      languages.totalDocs,
    news: news.totalDocs,
    projects: projects.totalDocs,
    upcoming: upcoming.totalDocs,
    publications: publications.totalDocs,
    users: users.totalDocs,
  };
}

const card = (label: string, value: number | string, sub?: string) => (
  <div
    style={{
      background: "var(--theme-elevation-0)",
      border: "1px solid var(--theme-elevation-200)",
      borderRadius: 14,
      padding: "18px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      boxShadow: "0 1px 2px rgba(18, 22, 32, 0.03), 0 4px 14px rgba(18, 22, 32, 0.04)",
    }}
  >
    <div
      style={{
        fontFamily: "EB Garamond, Cormorant, Times New Roman, serif",
        fontSize: 38,
        fontWeight: 500,
        color: "var(--theme-elevation-900)",
        letterSpacing: "-0.02em",
        lineHeight: 1,
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: "var(--theme-elevation-500)",
        marginTop: 6,
      }}
    >
      {label}
    </div>
    {sub ? (
      <div
        style={{
          marginTop: 8,
          fontSize: 12,
          color: "#9f1f2a",
          fontWeight: 600,
        }}
      >
        {sub}
      </div>
    ) : null}
  </div>
);

export default async function BeforeDashboard() {
  let stats: Awaited<ReturnType<typeof getStats>>;
  try {
    stats = await getStats();
  } catch {
    return null;
  }

  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          background:
            "linear-gradient(135deg, #fbfaf6 0%, #f4f0e8 100%)",
          border: "1px solid #e8e3d8",
          borderRadius: 16,
          padding: "26px 28px",
          marginBottom: 22,
          display: "flex",
          alignItems: "center",
          gap: 22,
          flexWrap: "wrap",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: "#121620",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              display: "inline-block",
              backgroundImage: 'url("/lhflogo.png")',
              backgroundSize: "auto 100%",
              backgroundPosition: "left center",
              backgroundRepeat: "no-repeat",
              filter: "invert(1) brightness(1.2)",
            }}
          />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9f1f2a",
              marginBottom: 6,
            }}
          >
            LHF Ethiopia · Admin
          </div>
          <h1
            style={{
              fontFamily:
                "EB Garamond, Cormorant, Times New Roman, serif",
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 500,
              color: "#121620",
              margin: 0,
              letterSpacing: "-0.014em",
              lineHeight: 1.15,
            }}
          >
            Manage every page in English, አማርኛ and Afaan Oromoo.
          </h1>
          <p
            style={{
              fontSize: 13.5,
              color: "#58606e",
              marginTop: 8,
              maxWidth: 640,
              lineHeight: 1.55,
            }}
          >
            Pick a section in the left sidebar to start editing.
            Every translatable field has a locale switcher at the top
            of the form — your changes appear on the public site
            within 30 seconds.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
        }}
      >
        {card("Content items total", stats.total)}
        {card("News articles", stats.news, "Editorial")}
        {card("Active projects", stats.projects, "Engage")}
        {card("Upcoming events", stats.upcoming, "Engage")}
        {card("Publications", stats.publications, "Library")}
        {card("Admin users", stats.users, "Site")}
      </div>
    </div>
  );
}
