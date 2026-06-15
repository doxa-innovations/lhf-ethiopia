"use client";

import { Card, CardBody } from "@/components/ui";
import { Chart } from "@/components/charts/Chart";
import { IMPACT_TIMESERIES, TITLES_PER_LANGUAGE } from "@/lib/content";

export function ImpactCharts() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }} className="impact-grid">
      <Card>
        <CardBody>
          <header style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgb(var(--brand))",
              }}
            >
              Books distributed per year
            </p>
            <h3 className="text-h3" style={{ marginTop: 4 }}>
              By heart language, 2020 → 2026
            </h3>
          </header>
          <Chart
            type="area"
            height={340}
            series={IMPACT_TIMESERIES.series.map((s) => ({ name: s.name, data: [...s.data] }))}
            options={{
              xaxis: { categories: [...IMPACT_TIMESERIES.years] },
              stroke: { curve: "smooth", width: 2 },
              fill: {
                type: "gradient",
                gradient: { opacityFrom: 0.42, opacityTo: 0.04, stops: [0, 100] },
              },
              legend: { position: "top", horizontalAlign: "left" },
              yaxis: {
                labels: { formatter: (v) => `${v}` },
                title: {
                  text: "Copies distributed",
                  style: { color: "rgb(var(--ink-faint))", fontWeight: 500 },
                },
              },
              tooltip: { shared: true, y: { formatter: (v) => `${v} copies` } },
              markers: { size: 0, hover: { size: 4 } },
              colors: [
                "rgb(var(--brand))",
                "rgb(var(--ink))",
                "rgb(var(--gold))",
                "rgb(var(--green))",
              ],
            }}
          />
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <header style={{ marginBottom: 16 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgb(var(--brand))",
              }}
            >
              Titles per language
            </p>
            <h3 className="text-h3" style={{ marginTop: 4 }}>
              The library today
            </h3>
          </header>
          <Chart
            type="bar"
            height={340}
            series={[
              {
                name: "Titles",
                data: TITLES_PER_LANGUAGE.map((t) => t.titles),
              },
            ]}
            options={{
              plotOptions: {
                bar: {
                  horizontal: true,
                  borderRadius: 4,
                  barHeight: "62%",
                  distributed: true,
                  dataLabels: { position: "top" },
                },
              },
              dataLabels: {
                enabled: true,
                offsetX: 8,
                style: {
                  fontWeight: 700,
                  colors: ["rgb(var(--ink))"],
                },
                formatter: (v) => `${v}`,
              },
              xaxis: {
                categories: TITLES_PER_LANGUAGE.map((t) => t.language),
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
              },
              yaxis: {
                labels: {
                  style: { colors: "rgb(var(--ink))", fontSize: "12px", fontWeight: 500 },
                },
              },
              grid: { show: false },
              legend: { show: false },
              tooltip: { y: { formatter: (v) => `${v} titles` } },
              colors: [
                "rgb(var(--brand))",
                "rgb(var(--brand) / 0.85)",
                "rgb(var(--brand) / 0.7)",
                "rgb(var(--brand) / 0.55)",
                "rgb(var(--brand) / 0.4)",
                "rgb(var(--brand) / 0.3)",
              ],
            }}
          />
        </CardBody>
      </Card>

      <style>{`
        @media (max-width: 1024px) {
          .impact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
