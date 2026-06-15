import type { Metadata } from "next";
import { BookOpen, Globe2, ShieldCheck, Truck } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Field,
  Input,
  Reveal,
  Textarea,
} from "@/components/ui";
import { GridBackdrop } from "@/components/marketing/GridBackdrop";
import { AllocationDonut } from "@/components/marketing/AllocationDonut";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give to LHF Ethiopia. Every dollar goes toward translating, printing, and freely distributing Lutheran books in heart languages across Ethiopia.",
};

const AMOUNTS = [
  { value: 7, label: "$7", caption: "1 catechism printed" },
  { value: 35, label: "$35", caption: "Sunday-school pack of 5" },
  { value: 120, label: "$120", caption: "Pastor's library starter set" },
  { value: 500, label: "$500", caption: "Print run of 100 catechisms" },
];

export default function DonatePage() {
  return (
    <>
      <section className="subhero">
        <GridBackdrop />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Donate</span>
            <h1 className="text-display">Send a book where it&apos;s needed most.</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 700 }}>
              Every gift is converted directly into translated, printed, and distributed
              books — given away free to Ethiopian Lutheran congregations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 32,
              alignItems: "flex-start",
            }}
            className="donate-grid"
          >
            <Reveal>
              <Card>
                <CardBody>
                  <h2 className="text-h2">Make a gift</h2>
                  <p className="text-body" style={{ marginTop: 8 }}>
                    Pick an amount or enter your own. Most donors give once a quarter.
                  </p>

                  <div
                    style={{
                      marginTop: 24,
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                    }}
                    className="amount-grid"
                  >
                    {AMOUNTS.map((a) => (
                      <button
                        key={a.value}
                        type="button"
                        style={{
                          background: "white",
                          border: "1.5px solid rgb(var(--border-strong))",
                          borderRadius: 12,
                          padding: "16px 12px",
                          textAlign: "left",
                          transition: "all var(--duration-fast)",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 22,
                            fontWeight: 800,
                            color: "rgb(var(--brand))",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {a.label}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgb(var(--ink-faint))",
                            marginTop: 4,
                          }}
                        >
                          {a.caption}
                        </div>
                      </button>
                    ))}
                  </div>

                  <form
                    style={{ marginTop: 24, display: "grid", gap: 16 }}
                  >
                    <Field label="Custom amount (USD)" htmlFor="amount">
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        min={1}
                        placeholder="50"
                        inputMode="decimal"
                      />
                    </Field>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Field label="Full name" htmlFor="name">
                        <Input
                          id="name"
                          name="name"
                          placeholder="Selamawit Bekele"
                          required
                        />
                      </Field>
                      <Field label="Email" htmlFor="email">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </Field>
                    </div>
                    <Field
                      label="Designate (optional)"
                      htmlFor="designate"
                      hint="E.g. 'Sidaama Catechism' or 'Where most needed'"
                    >
                      <Input
                        id="designate"
                        name="designate"
                        placeholder="Where most needed"
                      />
                    </Field>
                    <Field label="Note for the team" htmlFor="note">
                      <Textarea
                        id="note"
                        name="note"
                        rows={3}
                        placeholder="Anything we should know?"
                      />
                    </Field>
                    <Button variant="primary" size="lg" type="submit">
                      Continue to secure checkout
                    </Button>
                    <p
                      style={{
                        fontSize: 12,
                        color: "rgb(var(--ink-faint))",
                        textAlign: "center",
                      }}
                    >
                      Payments are processed by LHF&apos;s US parent organization. US
                      donors: tax-deductible to the fullest extent of the law.
                    </p>
                  </form>
                </CardBody>
              </Card>
            </Reveal>

            <div style={{ display: "grid", gap: 16 }}>
              <Reveal delay={0.1}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">Where your gift goes</h3>
                    <p
                      className="text-caption"
                      style={{ marginTop: 4 }}
                    >
                      Allocation of every dollar received in 2025.
                    </p>
                    <div style={{ marginTop: 8 }}>
                      <AllocationDonut height={300} />
                    </div>
                    <ul
                      style={{
                        marginTop: 8,
                        display: "grid",
                        gap: 10,
                        listStyle: "none",
                        fontSize: 13,
                      }}
                    >
                      <Legend
                        icon={<Truck size={14} />}
                        label="Printing & paper"
                        pct={42}
                        color="rgb(var(--brand))"
                      />
                      <Legend
                        icon={<BookOpen size={14} />}
                        label="Translation review"
                        pct={28}
                        color="rgb(var(--ink))"
                      />
                      <Legend
                        icon={<Globe2 size={14} />}
                        label="Distribution & customs"
                        pct={22}
                        color="rgb(var(--gold))"
                      />
                      <Legend
                        icon={<ShieldCheck size={14} />}
                        label="Operations & admin"
                        pct={8}
                        color="rgb(var(--ink-faint))"
                      />
                    </ul>
                  </CardBody>
                </Card>
              </Reveal>

              <Reveal delay={0.15}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">Give another way</h3>
                    <div
                      style={{
                        marginTop: 14,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: "rgb(var(--ink-muted))",
                      }}
                    >
                      <p>
                        <strong>By mail:</strong> Lutheran Heritage Foundation, 51474 Romeo
                        Plank, Macomb, MI 48042, USA. Memo: <em>Ethiopia</em>.
                      </p>
                      <p style={{ marginTop: 10 }}>
                        <strong>In Ethiopia:</strong> contact our Addis office at{" "}
                        <a
                          href={`mailto:${SITE.email}`}
                          style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
                        >
                          {SITE.email}
                        </a>{" "}
                        for local bank transfer details.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .donate-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 600px) {
            .amount-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>
    </>
  );
}

function Legend({
  icon,
  label,
  pct,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          gap: 10,
          alignItems: "center",
          color: "rgb(var(--ink))",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 10,
            height: 10,
            borderRadius: 3,
            background: color,
          }}
        />
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          {icon}
          {label}
        </span>
      </span>
      <strong style={{ color: "rgb(var(--ink))" }}>{pct}%</strong>
    </li>
  );
}
