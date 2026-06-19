import type { MetadataRoute } from "next";

const BASE = "https://ethiopia.lhfmissions.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/publications", priority: 0.9, freq: "weekly" },
    { path: "/podcast", priority: 0.9, freq: "weekly" },
    { path: "/projects", priority: 0.9, freq: "weekly" },
    { path: "/events", priority: 0.8, freq: "weekly" },
    { path: "/news", priority: 0.8, freq: "weekly" },
    { path: "/donate", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
    alternates: {
      languages: {
        en: `${BASE}${r.path}`,
        am: `${BASE}${r.path}?lang=am`,
        om: `${BASE}${r.path}?lang=om`,
      },
    },
  }));
}
