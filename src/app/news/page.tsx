import type { Metadata } from "next";
import {
  Badge,
  Card,
  CardBody,
  Reveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/ui";
import { GridBackdrop } from "@/components/marketing/GridBackdrop";
import { NEWS } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description:
    "Updates from translation teams, distribution runs, and congregations served by LHF Ethiopia.",
};

export default function NewsPage() {
  return (
    <>
      <section className="subhero">
        <GridBackdrop />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">News</span>
            <h1 className="text-display">The Word at work.</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 680 }}>
              Real updates from translation desks, print floors, and the congregations
              that receive these books.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StaggerChildren style={{ display: "grid", gap: 20 }}>
            {NEWS.map((post) => (
              <StaggerItem key={post.slug}>
                <Card>
                  <CardBody>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "180px 1fr",
                        gap: 24,
                        alignItems: "flex-start",
                      }}
                      className="news-row"
                    >
                      <div>
                        <Badge tone="cream">{post.tag}</Badge>
                        <div
                          style={{
                            marginTop: 12,
                            fontSize: 12,
                            color: "rgb(var(--ink-faint))",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-h2">{post.title}</h2>
                        <p className="text-body" style={{ marginTop: 10 }}>
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .news-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          }
        `}</style>
      </section>
    </>
  );
}
