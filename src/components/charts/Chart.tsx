"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { ApexOptions } from "apexcharts";
import { buildChartTheme } from "./chart-theme";

// ApexCharts touches `window`, so SSR is disabled.
const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(90deg, rgb(var(--surface-2)) 0%, rgb(var(--surface)) 50%, rgb(var(--surface-2)) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.6s infinite",
        borderRadius: 12,
      }}
    />
  ),
});

type ChartType =
  | "line"
  | "area"
  | "bar"
  | "donut"
  | "pie"
  | "radialBar"
  | "rangeBar"
  | "heatmap"
  | "scatter"
  | "treemap";

export function Chart({
  type,
  series,
  options,
  height = 320,
  width = "100%",
  className,
}: {
  type: ChartType;
  series: ApexOptions["series"];
  options?: ApexOptions;
  height?: number | string;
  width?: number | string;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mergedOptions = useMemo(
    () => buildChartTheme(options),
    [options, mounted],
  );

  if (!mounted) {
    return <div className={className} style={{ height, width }} />;
  }

  return (
    <div className={className}>
      <ApexChart
        type={type}
        series={series}
        options={mergedOptions}
        height={height}
        width={width}
      />
    </div>
  );
}
