import type { Metadata } from "next";
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
import { GridBackdrop } from "@/components/marketing/GridBackdrop";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact LHF Ethiopia: request books for your congregation, propose a new translation, or partner with us.",
};

export default function ContactPage() {
  return (
    <>
      <section className="subhero">
        <GridBackdrop />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Contact</span>
            <h1 className="text-display">Tell us about your congregation.</h1>
            <p className="text-body-lg" style={{ marginTop: 16, maxWidth: 680 }}>
              Request books, propose a new language, or just say hello. We read everything.
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
                  <h2 className="text-h2">Send a message</h2>
                  <form
                    style={{ marginTop: 20, display: "grid", gap: 16 }}
                  >
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Field label="Name" htmlFor="name">
                        <Input
                          id="name"
                          name="name"
                          placeholder="Full name"
                          required
                        />
                      </Field>
                      <Field label="Role" htmlFor="role">
                        <Input
                          id="role"
                          name="role"
                          placeholder="Pastor / teacher / donor"
                        />
                      </Field>
                    </div>
                    <div
                      className="grid-2"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <Field label="Email" htmlFor="email">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                        />
                      </Field>
                      <Field label="Phone (optional)" htmlFor="phone">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+251…"
                        />
                      </Field>
                    </div>
                    <Field label="Congregation / city" htmlFor="parish">
                      <Input
                        id="parish"
                        name="parish"
                        placeholder="St. Paul Lutheran, Hawassa"
                      />
                    </Field>
                    <Field
                      label="Language(s) needed"
                      htmlFor="language"
                      hint="E.g. Amharic, Afaan Oromoo, Tigrinya, Sidaama…"
                    >
                      <Input id="language" name="language" />
                    </Field>
                    <Field label="How can we help?" htmlFor="message">
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about your parish, what books you need, and how many."
                        required
                      />
                    </Field>
                    <Button variant="primary" size="lg" type="submit">
                      Send message
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Reveal>

            <div style={{ display: "grid", gap: 16 }}>
              <Reveal delay={0.1}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">LHF Ethiopia office</h3>
                    <ul
                      style={{
                        marginTop: 16,
                        listStyle: "none",
                        display: "grid",
                        gap: 14,
                      }}
                    >
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
                    <h3 className="text-h3">Office hours</h3>
                    <div
                      style={{
                        marginTop: 14,
                        fontSize: 14,
                        color: "rgb(var(--ink-muted))",
                        lineHeight: 1.7,
                      }}
                    >
                      Monday – Friday · 9:00 – 17:00 EAT
                      <br />
                      Saturday – Sunday · closed
                    </div>
                  </CardBody>
                </Card>
              </Reveal>

              <Reveal delay={0.2}>
                <Card>
                  <CardBody>
                    <h3 className="text-h3">Parent organization</h3>
                    <p
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: "rgb(var(--ink-muted))",
                        lineHeight: 1.6,
                      }}
                    >
                      Lutheran Heritage Foundation · 51474 Romeo Plank, Macomb, MI 48042,
                      USA ·{" "}
                      <a
                        href="https://lhfmissions.org"
                        style={{ color: "rgb(var(--brand))", fontWeight: 600 }}
                      >
                        lhfmissions.org
                      </a>
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

function Item({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        fontSize: 14,
        color: "rgb(var(--ink-muted))",
      }}
    >
      <span style={{ color: "rgb(var(--brand))", marginTop: 2 }}>{icon}</span>
      <span>{children}</span>
    </li>
  );
}
