"use client";

import { Chart } from "@/components/charts/Chart";
import { ALLOCATION } from "@/lib/content";
import { useT } from "@/components/providers/LanguageProvider";

// Literal hex — ApexCharts can't resolve CSS variables in fill attrs.
const BRAND = "#9F1F2A";
const TEAL = "#2E8E8E";
const GOLD = "#C49A38";
const INK_FAINT = "#8A919E";
const INK = "#121620";

const LABEL_KEYS: Record<string, string> = {
  "Printing & paper": "donate.allocPrinting",
  "Translation review": "donate.allocTranslation",
  "Distribution & customs": "donate.allocDistribution",
  "Operations & admin": "donate.allocOps",
};

export function AllocationDonut({ height = 320 }: { height?: number }) {
  const { t } = useT();
  const values = ALLOCATION.map((a) => a.value);
  const labels = ALLOCATION.map((a) => {
    const key = LABEL_KEYS[a.label];
    return key ? t(key as Parameters<typeof t>[0]) : a.label;
  });
  const ofDollar = t("donate.allocOfDollar");
  const centsOfDollar = t("donate.allocCentsOfDollar");

  return (
    <Chart
      type="donut"
      height={height}
      series={values}
      options={{
        chart: { background: "transparent" },
        labels,
        plotOptions: {
          pie: {
            donut: {
              size: "68%",
              labels: {
                show: true,
                name: { show: true, fontSize: "12px", color: INK_FAINT },
                value: {
                  show: true,
                  fontSize: "26px",
                  fontWeight: 700,
                  color: INK,
                  formatter: (v) => `${v}%`,
                },
                total: {
                  show: true,
                  label: ofDollar,
                  formatter: () => `${values.reduce((a, b) => a + b, 0)}%`,
                },
              },
            },
          },
        },
        legend: {
          position: "bottom",
          fontSize: "12px",
          labels: { colors: INK_FAINT },
          itemMargin: { horizontal: 8, vertical: 4 },
        },
        stroke: { width: 2, colors: ["#FFFFFF"] },
        colors: [BRAND, TEAL, GOLD, INK],
        dataLabels: { enabled: false },
        tooltip: { y: { formatter: (v) => `${v}${centsOfDollar}` } },
      }}
    />
  );
}
