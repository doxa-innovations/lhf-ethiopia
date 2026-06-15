"use client";

import { Chart } from "@/components/charts/Chart";
import { ALLOCATION } from "@/lib/content";

export function AllocationDonut({ height = 320 }: { height?: number }) {
  const values = ALLOCATION.map((a) => a.value);
  const labels = ALLOCATION.map((a) => a.label);

  return (
    <Chart
      type="donut"
      height={height}
      series={values}
      options={{
        labels,
        plotOptions: {
          pie: {
            donut: {
              size: "68%",
              labels: {
                show: true,
                name: { show: true, fontSize: "12px", color: "rgb(var(--ink-muted))" },
                value: {
                  show: true,
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "rgb(var(--ink))",
                  formatter: (v) => `${v}%`,
                },
                total: {
                  show: true,
                  label: "Of every dollar",
                  formatter: () => `${values.reduce((a, b) => a + b, 0)}%`,
                },
              },
            },
          },
        },
        legend: {
          position: "bottom",
          fontSize: "12px",
          labels: { colors: "rgb(var(--ink-muted))" },
          itemMargin: { horizontal: 8, vertical: 4 },
        },
        stroke: { width: 2, colors: ["rgb(var(--surface))"] },
        colors: [
          "rgb(var(--brand))",
          "rgb(var(--ink))",
          "rgb(var(--gold))",
          "rgb(var(--ink-faint))",
        ],
        tooltip: { y: { formatter: (v) => `${v}¢ of every dollar` } },
      }}
    />
  );
}
