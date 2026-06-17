"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

type Value = {
  slug: string;
  title: string;
  body: string;
};

export function ValuesAccordion({
  values,
  defaultOpenSlug,
  compact = false,
}: {
  values: readonly Value[];
  defaultOpenSlug?: string;
  /** When true, used in tight sidebars (home page Values block). */
  compact?: boolean;
}) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpenSlug}
      style={{ display: "grid", gap: 10 }}
    >
      {values.map((v, i) => (
        <Accordion.Item
          key={v.slug}
          value={v.slug}
          style={{
            background: "rgb(var(--surface))",
            border: "1px solid rgb(var(--border))",
            borderLeft: "3px solid rgb(var(--brand))",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Accordion.Header style={{ margin: 0 }}>
            <Accordion.Trigger
              className="values-accordion-trigger"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: compact ? "12px 14px" : "16px 18px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                color: "rgb(var(--ink))",
                font: "inherit",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <span
                  aria-hidden
                  style={{
                    width: compact ? 26 : 30,
                    height: compact ? 26 : 30,
                    borderRadius: 8,
                    background: "rgb(var(--brand-muted))",
                    color: "rgb(var(--brand-strong))",
                    fontWeight: 800,
                    fontSize: 12,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: compact ? 14 : 15,
                    fontWeight: 700,
                    overflowWrap: "anywhere",
                    lineHeight: 1.3,
                  }}
                >
                  {v.title}
                </span>
              </span>
              <ChevronDown
                size={16}
                className="values-accordion-chev"
                style={{ flexShrink: 0, color: "rgb(var(--ink-faint))", transition: "transform 200ms ease" }}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="values-accordion-content">
            <div
              style={{
                padding: compact ? "0 14px 14px 52px" : "0 18px 18px 60px",
                fontSize: compact ? 13.5 : 14,
                color: "rgb(var(--ink-muted))",
                lineHeight: 1.65,
              }}
            >
              {v.body}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}

      <style>{`
        .values-accordion-trigger[data-state="open"] .values-accordion-chev {
          transform: rotate(180deg);
        }
        .values-accordion-content[data-state="open"] {
          animation: valAccordionOpen 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .values-accordion-content[data-state="closed"] {
          animation: valAccordionClose 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes valAccordionOpen {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes valAccordionClose {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        .values-accordion-content { overflow: hidden; }
      `}</style>
    </Accordion.Root>
  );
}
