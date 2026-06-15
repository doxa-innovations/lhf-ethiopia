"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  Field,
  Input,
  Reveal,
  Textarea,
} from "@/components/ui";
import { useT } from "@/components/providers/LanguageProvider";
import { SITE } from "@/lib/content";

export function ContactPageClient() {
  const { t } = useT();
  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">{t("contact.label")}</span>
            <h1 className="text-display">{t("contact.title")}</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 680 }}>
              {t("contact.intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "flex-start" }}>
            <Reveal>
              <Card>
                <CardBody>
                  <h2 className="text-h2">{t("contact.formTitle")}</h2>
                  <form style={{ marginTop: 18, display: "grid", gap: 14 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Field label={t("contact.nameLabel")} htmlFor="name">
                        <Input id="name" name="name" placeholder="Full name" required />
                      </Field>
                      <Field label={t("contact.roleLabel")} htmlFor="role">
                        <Input id="role" name="role" placeholder="Pastor / teacher / donor" />
                      </Field>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <Field label={t("contact.emailLabel")} htmlFor="email">
                        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                      </Field>
                      <Field label={t("contact.phoneLabel")} htmlFor="phone">
                        <Input id="phone" name="phone" type="tel" placeholder="+251…" />
                      </Field>
                    </div>
                    <Field label={t("contact.parishLabel")} htmlFor="parish">
                      <Input id="parish" name="parish" placeholder="St. Paul Lutheran, Hawassa" />
                    </Field>
                    <Field label={t("contact.languageLabel")} htmlFor="language" hint={t("contact.languageHint")}>
                      <Input id="language" name="language" />
                    </Field>
                    <Field label={t("contact.messageLabel")} htmlFor="message">
                      <Textarea id="message" name="message" rows={5} placeholder="Tell us about your parish, what books you need, and how many." required />
                    </Field>
                    <Button variant="primary" size="lg" type="submit">{t("contact.submitCta")}</Button>
                  </form>
                </CardBody>
              </Card>
            </Reveal>

            <div style={{ display: "grid", gap: 16 }}>
              <Reveal delay={0.1}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">{t("contact.officeTitle")}</h3>
                    <ul style={{ marginTop: 14, listStyle: "none", display: "grid", gap: 12 }}>
                      <Item icon={<MapPin size={16} />}>{SITE.address}</Item>
                      <Item icon={<Phone size={16} />}>
                        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
                      </Item>
                      <Item icon={<Mail size={16} />}>
                        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                      </Item>
                    </ul>
                  </CardBody>
                </Card>
              </Reveal>

              <Reveal delay={0.15}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">{t("contact.hoursTitle")}</h3>
                    <div style={{ marginTop: 12, fontSize: 13.5, color: "rgb(var(--ink-muted))", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                      {t("contact.hours")}
                    </div>
                  </CardBody>
                </Card>
              </Reveal>

              <Reveal delay={0.2}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">{t("contact.parentTitle")}</h3>
                    <p style={{ marginTop: 10, fontSize: 13.5, color: "rgb(var(--ink-muted))", lineHeight: 1.6 }}>
                      Lutheran Heritage Foundation · 51474 Romeo Plank, Macomb, MI 48042, USA ·{" "}
                      <a href="https://lhfmissions.org" style={{ color: "rgb(var(--brand))", fontWeight: 600 }}>lhfmissions.org</a>
                    </p>
                  </CardBody>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Item({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 13.5, color: "rgb(var(--ink-muted))" }}>
      <span style={{ color: "rgb(var(--brand))", marginTop: 2 }}>{icon}</span>
      <span>{children}</span>
    </li>
  );
}
