import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/my-bookings/"],
      },
    ],
    sitemap: "https://vncbooking.com/sitemap.xml",
  }
}
