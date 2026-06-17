"use client";

import { Card, CardBody } from "@/components/ui";
import { Chart } from "@/components/charts/Chart";
import { IMPACT_TIMESERIES, TITLES_PER_LANGUAGE } from "@/lib/content";
import { useT } from "@/components/providers/LanguageProvider";

// ApexCharts evaluates color strings against the SVG fill attribute, which
// does not resolve CSS custom properties. Pass literal hex values mirroring
// the brand palette so charts don't fall back to Apex's default greys.
const BRAND = "#9F1F2A";
const TEAL = "#2E8E8E";
const NAVY = "#1E2A47";
const BRAND_SOFT = "#C4565C";
const GOLD = "#C49A38";
const INK = "#121620";
const INK_FAINT = "#8A919E";

const AREA_COLORS = [BRAND, TEAL, NAVY, BRAND_SOFT];
const BAR_COLORS = [BRAND, TEAL, NAVY, GOLD, INK, INK_FAINT];

export function ImpactCharts() {
  const { t } = useT();
  const seriesCopies = t("home.impactChart1Series");
  const seriesTitles = t("home.impactChart2Series");

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
                color: BRAND,
              }}
            >
              {t("home.impactChart1Title")}
            </p>
            <h3 className="text-h3" style={{ marginTop: 4 }}>
              {t("home.impactChart1Subtitle")}
            </h3>
          </header>
          <Chart
            type="area"
            height={340}
            series={IMPACT_TIMESERIES.series.map((s) => ({ name: s.name, data: [...s.data] }))}
            options={{
              chart: { toolbar: { show: false }, background: "transparent" },
              xaxis: { categories: [...IMPACT_TIMESERIES.years] },
              stroke: { curve: "smooth", width: 2.5 },
              fill: {
                type: "gradient",
                gradient: {
                  shade: "light",
                  type: "vertical",
                  shadeIntensity: 0.25,
                  opacityFrom: 0.55,
                  opacityTo: 0.08,
                  stops: [0, 100],
                },
              },
              legend: { position: "top", horizontalAlign: "left", labels: { colors: INK } },
              yaxis: {
                labels: { formatter: (v) => `${v}`, style: { colors: INK_FAINT } },
                title: {
                  text: seriesCopies,
                  style: { color: INK_FAINT, fontWeight: 500 },
                },
              },
              tooltip: { shared: true, y: { formatter: (v) => `${v} ${seriesCopies.toLowerCase()}` } },
              markers: { size: 0, hover: { size: 5 } },
              dataLabels: { enabled: false },
              colors: AREA_COLORS,
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
                color: BRAND,
              }}
            >
              {t("home.impactChart2Title")}
            </p>
            <h3 className="text-h3" style={{ marginTop: 4 }}>
              {t("home.impactChart2Subtitle")}
            </h3>
          </header>
          <Chart
            type="bar"
            height={340}
            series={[
              {
                name: seriesTitles,
                data: TITLES_PER_LANGUAGE.map((t) => t.titles),
              },
            ]}
            options={{
              chart: { toolbar: { show: false }, background: "transparent" },
              plotOptions: {
                bar: {
                  horizontal: true,
                  borderRadius: 6,
                  barHeight: "62%",
                  distributed: true,
                  dataLabels: { position: "top" },
                },
              },
              dataLabels: {
                enabled: true,
                offsetX: 12,
                style: {
                  fontWeight: 700,
                  fontSize: "12px",
                  colors: [INK],
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
                  style: { colors: INK, fontSize: "12px", fontWeight: 500 },
                },
              },
              grid: { show: false },
              legend: { show: false },
              tooltip: { y: { formatter: (v) => `${v} ${seriesTitles.toLowerCase()}` } },
              colors: BAR_COLORS,
              stroke: { show: false },
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
