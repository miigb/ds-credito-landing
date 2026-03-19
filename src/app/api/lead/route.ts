import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY || "";
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

export async function POST(req: NextRequest) {
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    return NextResponse.json(
      { error: "Notion not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      source,
      // B2B fields
      role,
      message,
      // B2C fields
      operation_type,
      help_type,
      financing_value,
      property_choice,
      sell_property,
      proponents,
      income,
      preferred_schedule,
    } = body;

    // Build details string for B2C submissions
    const details =
      source === "B2C Credit Request"
        ? [
            operation_type && `Operação: ${operation_type}`,
            help_type && `Ajuda: ${help_type}`,
            financing_value && `Valor: €${financing_value}`,
            property_choice && `Imóvel: ${property_choice}`,
            sell_property && `Vender atual: ${sell_property}`,
            proponents && `Proponentes: ${proponents}`,
            income && `Rendimento: €${income}`,
            preferred_schedule && `Horário: ${preferred_schedule}`,
          ]
            .filter(Boolean)
            .join("\n")
        : message || "";

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
            title: [{ text: { content: name || "Sem nome" } }],
          },
          Email: {
            email: email || null,
          },
          Phone: {
            phone_number: phone || null,
          },
          Source: {
            select: { name: source || "Website" },
          },
          Role: {
            rich_text: [{ text: { content: role || "" } }],
          },
          Details: {
            rich_text: [
              { text: { content: details.slice(0, 2000) } },
            ],
          },
          Status: {
            select: { name: "New" },
          },
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Notion API error:", err);
      return NextResponse.json({ error: "Notion error" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Lead API error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
