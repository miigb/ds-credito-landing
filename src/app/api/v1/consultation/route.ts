import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY || "";
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

interface ConsultationRequest {
  name: string;
  email: string;
  phone?: string;
  buyerType?: "portuguese-resident" | "eu-citizen" | "non-eu-citizen" | "non-resident";
  propertyType?: "apartment" | "house" | "land" | "commercial" | "other";
  estimatedValue?: number;
  downPayment?: number;
  preferredLanguage?: "pt" | "en";
  message?: string;
  referralSource?: string;
}

function validateRequest(body: ConsultationRequest): string[] {
  const errors: string[] = [];

  if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
    errors.push("name is required (minimum 2 characters)");
  }

  if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) {
    errors.push("a valid email is required");
  }

  if (body.buyerType && !["portuguese-resident", "eu-citizen", "non-eu-citizen", "non-resident"].includes(body.buyerType)) {
    errors.push("buyerType must be one of: portuguese-resident, eu-citizen, non-eu-citizen, non-resident");
  }

  if (body.propertyType && !["apartment", "house", "land", "commercial", "other"].includes(body.propertyType)) {
    errors.push("propertyType must be one of: apartment, house, land, commercial, other");
  }

  if (body.estimatedValue !== undefined && (typeof body.estimatedValue !== "number" || body.estimatedValue <= 0)) {
    errors.push("estimatedValue must be a positive number (in EUR)");
  }

  if (body.preferredLanguage && !["pt", "en"].includes(body.preferredLanguage)) {
    errors.push("preferredLanguage must be pt or en");
  }

  return errors;
}

export async function POST(req: NextRequest) {
  // CORS preflight is handled by OPTIONS below
  try {
    const body: ConsultationRequest = await req.json();

    // Validate
    const errors = validateRequest(body);
    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: "validation_failed",
          message: "One or more fields are invalid.",
          details: errors,
        },
        {
          status: 422,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Generate reference ID
    const referenceId = `LP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Build details string
    const details = [
      body.buyerType && `Buyer type: ${body.buyerType}`,
      body.propertyType && `Property: ${body.propertyType}`,
      body.estimatedValue && `Est. value: €${body.estimatedValue.toLocaleString("pt-PT")}`,
      body.downPayment && `Down payment: €${body.downPayment.toLocaleString("pt-PT")}`,
      body.preferredLanguage && `Language: ${body.preferredLanguage}`,
      body.message && `Message: ${body.message}`,
      body.referralSource && `Source: ${body.referralSource}`,
      `Reference: ${referenceId}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Submit to Notion (same as lead API)
    if (NOTION_API_KEY && NOTION_DATABASE_ID) {
      const res = await fetch("https://api.notion.com/v1/pages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify({
          parent: { database_id: NOTION_DATABASE_ID },
          properties: {
            Name: {
              title: [{ text: { content: body.name } }],
            },
            Email: {
              email: body.email,
            },
            Phone: {
              phone_number: body.phone || null,
            },
            Source: {
              select: { name: body.referralSource || "API Consultation" },
            },
            Role: {
              rich_text: [{ text: { content: body.buyerType || "" } }],
            },
            Details: {
              rich_text: [{ text: { content: details.slice(0, 2000) } }],
            },
            Status: {
              select: { name: "New" },
            },
          },
        }),
      });

      if (!res.ok) {
        console.error("Notion API error:", await res.text());
        return NextResponse.json(
          {
            error: "submission_failed",
            message: "We could not process your request at this time. Please try again or contact us directly.",
            contact: {
              email: "info@letraperfeicoada.pt",
              phone: "+351 265 117 174",
            },
          },
          {
            status: 502,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        message: {
          en: "Your consultation request has been received. We will contact you within 24-48 hours.",
          pt: "O seu pedido de consulta foi recebido. Entraremos em contacto dentro de 24-48 horas.",
        },
        nextSteps: {
          en: [
            "A credit advisor will review your information",
            "We will schedule an initial feasibility call",
            "You will receive a comparison of bank offers",
          ],
          pt: [
            "Um consultor de crédito irá analisar a sua informação",
            "Agendaremos uma chamada inicial de viabilidade",
            "Receberá uma comparação de ofertas bancárias",
          ],
        },
      },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (e) {
    console.error("Consultation API error:", e);
    return NextResponse.json(
      {
        error: "internal_error",
        message: "An unexpected error occurred. Please contact us directly.",
        contact: {
          email: "info@letraperfeicoada.pt",
          phone: "+351 265 117 174",
        },
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

// Return API schema documentation on GET
export async function GET() {
  return NextResponse.json(
    {
      endpoint: "/api/v1/consultation",
      method: "POST",
      description: "Submit a consultation request for credit brokerage services.",
      contentType: "application/json",
      fields: {
        name: { type: "string", required: true, description: "Full name of the requester" },
        email: { type: "string", required: true, description: "Contact email address" },
        phone: { type: "string", required: false, description: "Phone number with country code" },
        buyerType: {
          type: "string",
          required: false,
          enum: ["portuguese-resident", "eu-citizen", "non-eu-citizen", "non-resident"],
          description: "Residency status of the buyer",
        },
        propertyType: {
          type: "string",
          required: false,
          enum: ["apartment", "house", "land", "commercial", "other"],
          description: "Type of property being purchased",
        },
        estimatedValue: {
          type: "number",
          required: false,
          description: "Estimated property value in EUR",
        },
        downPayment: {
          type: "number",
          required: false,
          description: "Available down payment in EUR",
        },
        preferredLanguage: {
          type: "string",
          required: false,
          enum: ["pt", "en"],
          description: "Preferred communication language",
        },
        message: {
          type: "string",
          required: false,
          description: "Additional message or context",
        },
        referralSource: {
          type: "string",
          required: false,
          description: "How the client found this service",
        },
      },
      responses: {
        "201": "Consultation request created successfully. Returns referenceId.",
        "422": "Validation error. Returns details of invalid fields.",
        "502": "Upstream service error. Includes fallback contact info.",
        "500": "Internal error. Includes fallback contact info.",
      },
      example: {
        request: {
          name: "John Smith",
          email: "john@example.com",
          phone: "+44 7700 900000",
          buyerType: "non-eu-citizen",
          propertyType: "apartment",
          estimatedValue: 250000,
          downPayment: 75000,
          preferredLanguage: "en",
          message: "Looking to purchase a 2-bedroom apartment in Lisbon area",
        },
        response: {
          success: true,
          referenceId: "LP-M1ABC-X2YZ",
          message: {
            en: "Your consultation request has been received. We will contact you within 24-48 hours.",
          },
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
