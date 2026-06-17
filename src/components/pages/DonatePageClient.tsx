"use client";

import { useState } from "react";
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
import { AllocationDonut } from "@/components/marketing/AllocationDonut";
import { useT } from "@/components/providers/LanguageProvider";
import { SITE } from "@/lib/content";

export function DonatePageClient() {
  const { t } = useT();
  const AMOUNTS = [
    { value: 7, label: "$7", caption: t("donate.amountLabel1") },
    { value: 35, label: "$35", caption: t("donate.amountLabel2") },
    { value: 120, label: "$120", caption: t("donate.amountLabel3") },
    { value: 500, label: "$500", caption: t("donate.amountLabel4") },
  ];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">{t("donate.label")}</span>
            <h1 className="text-display">{t("donate.title")}</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 700 }}>
              {t("donate.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="donate-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "flex-start" }}>
            <Reveal>
              <Card>
                <CardBody>
                  <h2 className="text-h2">{t("donate.makeGiftTitle")}</h2>
                  <p className="text-body" style={{ marginTop: 8 }}>{t("donate.makeGiftBody")}</p>

                  <div className="amount-grid" style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
                    {AMOUNTS.map((a) => {
                      const active = selectedAmount === a.value;
                      return (
                        <button
                          key={a.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedAmount(a.value)}
                          className="amount-btn"
                          style={{
                            background: active ? "rgb(var(--brand-muted))" : "white",
                            border: `1.5px solid ${active ? "rgb(var(--brand))" : "rgb(var(--border-strong))"}`,
                            borderRadius: 12,
                            padding: "14px 12px",
                            textAlign: "left",
                            cursor: "pointer",
                            transition: "all 180ms ease",
                          }}
                        >
                          <div className="font-display" style={{ fontSize: 22, fontWeight: 500, color: "rgb(var(--brand))", letterSpacing: "-0.02em" }}>{a.label}</div>
                          <div style={{ fontSize: 12, color: "rgb(var(--ink-faint))", marginTop: 4 }}>{a.caption}</div>
                        </button>
                      );
                    })}
                  </div>

                  <form style={{ marginTop: 24, display: "grid", gap: 14 }}>
                    <Field label={t("donate.customLabel")} htmlFor="amount">
                      <Input id="amount" name="amount" type="number" min={1} placeholder="50" inputMode="decimal" />
                    </Field>
                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                      <Field label={t("donate.nameLabel")} htmlFor="name">
                        <Input id="name" name="name" placeholder="Selamawit Bekele" required />
                      </Field>
                      <Field label={t("donate.emailLabel")} htmlFor="email">
                        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                      </Field>
                    </div>
                    <Field label={t("donate.designateLabel")} htmlFor="designate" hint={t("donate.designateHint")}>
                      <Input id="designate" name="designate" defaultValue="Ethiopia" placeholder="Where most needed" />
                    </Field>
                    <Field label={t("donate.noteLabel")} htmlFor="note">
                      <Textarea id="note" name="note" rows={3} placeholder="Anything we should know?" />
                    </Field>
                    <Button variant="primary" size="lg" type="submit">{t("donate.submitCta")}</Button>
                    <p style={{ fontSize: 12, color: "rgb(var(--ink-faint))", textAlign: "center" }}>{t("donate.taxNote")}</p>
                  </form>
                </CardBody>
              </Card>
            </Reveal>

            <div style={{ display: "grid", gap: 16 }}>
              <Reveal delay={0.1}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">{t("donate.allocationTitle")}</h3>
                    <p className="text-caption" style={{ marginTop: 4 }}>{t("donate.allocationCaption")}</p>
                    <div style={{ marginTop: 8 }}>
                      <AllocationDonut height={280} />
                    </div>
                    <ul style={{ marginTop: 6, display: "grid", gap: 10, listStyle: "none", fontSize: 13 }}>
                      <Legend icon={<Truck size={14} />} label={t("donate.allocPrinting")} pct={42} color="rgb(var(--brand))" />
                      <Legend icon={<BookOpen size={14} />} label={t("donate.allocTranslation")} pct={28} color="rgb(var(--ink))" />
                      <Legend icon={<Globe2 size={14} />} label={t("donate.allocDistribution")} pct={22} color="rgb(var(--teal))" />
                      <Legend icon={<ShieldCheck size={14} />} label={t("donate.allocOps")} pct={8} color="rgb(var(--ink-faint))" />
                    </ul>
                  </CardBody>
                </Card>
              </Reveal>

              <Reveal delay={0.15}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">{t("donate.otherWaysTitle")}</h3>
                    <div style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.65, color: "rgb(var(--ink-muted))" }}>
                      <p>{t("donate.otherWaysMail")}</p>
                      <p style={{ marginTop: 10 }}>
                        {t("donate.otherWaysLocal")}{" "}
                        <a href={`mailto:${SITE.email}`} style={{ color: "rgb(var(--brand))", fontWeight: 600 }}>{SITE.email}</a>{" "}
                        {t("donate.otherWaysLocalSuffix")}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 600px) {
            .amount-grid { grid-template-columns: repeat(4, 1fr) !important; }
            .form-row { grid-template-columns: 1fr 1fr !important; }
          }
          @media (min-width: 900px) {
            .donate-grid { grid-template-columns: 1.4fr 1fr !important; gap: 28px !important; }
          }
        `}</style>
      </section>
    </>
  );
}

function Legend({ icon, label, pct, color }: { icon: React.ReactNode; label: string; pct: number; color: string }) {
  return (
    <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ display: "inline-flex", gap: 10, alignItems: "center", color: "rgb(var(--ink))" }}>
        <span aria-hidden style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          {icon} {label}
        </span>
      </span>
      <strong style={{ color: "rgb(var(--ink))" }}>{pct}%</strong>
    </li>
  );
}
