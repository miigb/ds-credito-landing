import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

export async function GET() {
  return NextResponse.json(
    {
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      parentOrganization: siteConfig.parentOrganization,
      website: siteConfig.url,
      description: siteConfig.description,
      contact: {
        email: siteConfig.email,
        phone: siteConfig.phone,
        address: {
          street: siteConfig.address.streetAddress,
          city: siteConfig.address.addressLocality,
          region: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          country: siteConfig.address.addressCountry,
        },
        coordinates: siteConfig.geo,
      },
      openingHours: siteConfig.openingHours.map((h) => ({
        days: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      social: siteConfig.social,
      regulation: {
        registrationNumber: siteConfig.regulation.registrationNumber,
        category: siteConfig.regulation.category,
        regulator: siteConfig.regulation.regulator,
        registryUrl: siteConfig.regulation.registryUrl,
        exclusivity: siteConfig.regulation.exclusivity,
        creditTypes: siteConfig.regulation.creditTypes,
        consultancyServices: siteConfig.regulation.consultancyServices,
      },
      stats: {
        yearsExperience: siteConfig.stats.yearsExperience,
        storesNationwide: siteConfig.stats.stores,
        teamMembers: siteConfig.stats.teamMembers,
      },
      languages: ["pt", "en"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
