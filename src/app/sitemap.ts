import type { MetadataRoute } from "next";
import { getTodasNoticias } from "@/lib/sanity";

const BASE_URL = "https://icb.org.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const noticias = await getTodasNoticias().catch(() => []);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/noticias`,           lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/eventos`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/nautica`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/historia`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/identidade`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/administracao`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/documentos`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const noticiaRoutes: MetadataRoute.Sitemap = noticias
    .filter((n) => n.slug?.current)
    .map((n) => ({
      url: `${BASE_URL}/noticias/${n.slug.current}`,
      lastModified: n.data ? new Date(n.data) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...noticiaRoutes];
}
