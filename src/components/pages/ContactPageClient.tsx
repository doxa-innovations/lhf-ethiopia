"use client";

import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
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
import { EditableText } from "@/components/cms/EditableText";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/Info@lhfethiopia.org";

type Status = "idle" | "sending" | "success" | "error";

export function ContactPageClient() {
  const { t } = useT();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: bots fill hidden fields; real users don't.
    if ((form.elements.namedItem("_honey") as HTMLInputElement)?.value) return;

    const data = new FormData(form);
    const payload: Record<string, string> = {};
    data.forEach((v, k) => {
      if (typeof v === "string") payload[k] = v;
    });

    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { success?: string | boolean };
      // Formsubmit returns `success: "true"` (string) on activated forms.
      if (json.success === "true" || json.success === true) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(
          "Form endpoint not yet activated. Check the LHF Ethiopia inbox for a Formsubmit activation email and click the link.",
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Send failed");
    }
  }

  return (
    <>
      <section className="subhero">
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">
              <EditableText elementId="contact.label" defaultValue={t("contact.label")} />
            </span>
            <h1 className="text-display">
              <EditableText elementId="contact.title" defaultValue={t("contact.title")} />
            </h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 680 }}>
              <EditableText elementId="contact.intro" defaultValue={t("contact.intro")} multiline />
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
                  <h2 className="text-h2">
                    <EditableText elementId="contact.formTitle" defaultValue={t("contact.formTitle")} />
                  </h2>
                  {status === "success" ? (
                    <div
                      role="status"
                      style={{
                        marginTop: 18,
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        padding: "16px 18px",
                        borderRadius: 12,
                        background: "rgb(var(--teal-muted))",
                        border: "1px solid rgb(var(--teal))",
                        color: "rgb(var(--ink))",
                      }}
                    >
                      <CheckCircle2 size={20} style={{ color: "rgb(var(--teal-strong))", flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Message sent.</div>
                        <div style={{ fontSize: 13.5, color: "rgb(var(--ink-muted))", lineHeight: 1.55 }}>
                          Thank you — the LHF Ethiopia office will reply to the email you provided. For urgent parish requests, phone {SITE.phone}.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ marginTop: 18, display: "grid", gap: 14 }}>
                      {/* Formsubmit metadata */}
                      <input type="hidden" name="_subject" value="LHF Ethiopia — new contact form message" />
                      <input type="hidden" name="_template" value="table" />
                      <input type="hidden" name="_captcha" value="false" />
                      <input type="hidden" name="source" value="lhfethiopia.org/contact" />
                      {/* Honeypot — hidden from users, filled by bots */}
                      <input
                        type="text"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
                      />
                      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
                        <Field label={t("contact.nameLabel")} htmlFor="name">
                          <Input id="name" name="name" placeholder="Full name" required />
                        </Field>
                        <Field label={t("contact.roleLabel")} htmlFor="role">
                          <Input id="role" name="role" placeholder="Pastor / teacher / donor" />
                        </Field>
                      </div>
                      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
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
                      {status === "error" ? (
                        <div
                          role="alert"
                          style={{
                            fontSize: 13.5,
                            padding: "12px 14px",
                            borderRadius: 10,
                            background: "rgba(159, 31, 42, 0.08)",
                            border: "1px solid rgba(159, 31, 42, 0.35)",
                            color: "rgb(var(--brand))",
                          }}
                        >
                          {errorMsg ?? "Send failed. Please try again or email us directly at " + SITE.email + "."}
                        </div>
                      ) : null}
                      <Button variant="primary" size="lg" type="submit" disabled={status === "sending"}>
                        {status === "sending" ? "Sending…" : (
                          <EditableText elementId="contact.submitCta" defaultValue={t("contact.submitCta")} />
                        )}
                      </Button>
                    </form>
                  )}
                </CardBody>
              </Card>
            </Reveal>

            <div style={{ display: "grid", gap: 16 }}>
              <Reveal delay={0.1}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">
                      <EditableText elementId="contact.officeTitle" defaultValue={t("contact.officeTitle")} />
                    </h3>
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
                    <h3 className="text-h3">
                      <EditableText elementId="contact.hoursTitle" defaultValue={t("contact.hoursTitle")} />
                    </h3>
                    <div style={{ marginTop: 12, fontSize: 13.5, color: "rgb(var(--ink-muted))", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                      <EditableText elementId="contact.hours" defaultValue={t("contact.hours")} multiline />
                    </div>
                  </CardBody>
                </Card>
              </Reveal>

              <Reveal delay={0.2}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">
                      <EditableText elementId="contact.parentTitle" defaultValue={t("contact.parentTitle")} />
                    </h3>
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

      <style>{`
        @media (min-width: 600px) {
          .form-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
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
