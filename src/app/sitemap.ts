import type { MetadataRoute } from "next";

const BASE_URL = "https://liays.ca";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/notion-training", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
