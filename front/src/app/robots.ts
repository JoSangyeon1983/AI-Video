import type { MetadataRoute } from "next";
import { BASE_URL } from "@/data/brand";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
