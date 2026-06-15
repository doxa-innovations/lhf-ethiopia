"use client";

import type { ApexOptions } from "apexcharts";

/**
 * ApexCharts options pre-themed to LHF Ethiopia CSS vars. Reads from
 * :root so palette swaps in globals.css flow through automatically.
 */
export function buildChartTheme(overrides?: ApexOptions): ApexOptions {
  if (typeof window === "undefined") {
    return {
      chart: { background: "transparent", toolbar: { show: false } },
      ...overrides,
    };
  }

  const styles = getComputedStyle(document.documentElement);
  const rgb = (k: string) => `rgb(${styles.getPropertyValue(k).trim()})`;
  const ink = rgb("--ink");
  const inkMuted = rgb("--ink-muted");
  const border = rgb("--border");
  const colors = [
    rgb("--chart-1"),
    rgb("--chart-2"),
    rgb("--chart-3"),
    rgb("--chart-4"),
    rgb("--chart-5"),
  ];

  const base: ApexOptions = {
    chart: {
      background: "transparent",
      foreColor: inkMuted,
      fontFamily: "inherit",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: true, speed: 320 },
    },
    colors,
    grid: {
      borderColor: border,
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 0, right: 0 },
    },
    dataLabels: { enabled: false },
    legend: {
      labels: { colors: ink },
      itemMargin: { horizontal: 12 },
      markers: { size: 6, strokeWidth: 0 },
      fontWeight: 500,
    },
    tooltip: {
      theme: "light",
      style: { fontFamily: "inherit", fontSize: "12px" },
    },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      axisBorder: { color: border },
      axisTicks: { color: border },
      labels: { style: { colors: inkMuted, fontSize: "11px" } },
    },
    yaxis: {
      labels: { style: { colors: inkMuted, fontSize: "11px" } },
    },
  };

  return mergeDeep(base, overrides ?? {});
}

function mergeDeep<T extends object>(target: T, source: Partial<T>): T {
  const out = { ...target } as Record<string, unknown>;
  for (const [key, value] of Object.entries(source)) {
    const existing = (target as Record<string, unknown>)[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      existing &&
      typeof existing === "object" &&
      !Array.isArray(existing)
    ) {
      out[key] = mergeDeep(existing as object, value as object);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}
