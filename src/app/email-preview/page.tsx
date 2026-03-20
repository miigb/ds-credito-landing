import { b2bContactPT, b2bContactEN, b2cCreditPT, b2cCreditEN } from "@/lib/emailTemplates";

export default function EmailPreview() {
  // Dev-only preview — replace live URL with local path so CSP doesn't block
  const fixLocal = (html: string) =>
    html.replace("https://meuintermediario.com/ds-credito-logo.png", "/ds-credito-logo.png");

  const templates: Record<string, string> = {
    "b2b-pt": fixLocal(b2bContactPT("João Silva")),
    "b2b-en": fixLocal(b2bContactEN("John Smith")),
    "b2c-pt": fixLocal(b2cCreditPT("Ana Sousa")),
    "b2c-en": fixLocal(b2cCreditEN("James Wilson")),
  };

  return (
    <div style={{ padding: 20, fontFamily: "system-ui", background: "#f1f5f9", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 20, marginBottom: 12 }}>Email Template Preview</h1>
      <nav style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {Object.keys(templates).map((key) => (
          <a
            key={key}
            href={`/email-preview?template=${key}`}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: "#1E293B",
              color: "#fff",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {key.toUpperCase()}
          </a>
        ))}
      </nav>
      {Object.entries(templates).map(([key, html]) => (
        <div key={key} style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, color: "#334155", marginBottom: 8 }}>{key.toUpperCase()}</h2>
          <div
            style={{ border: "1px solid #e2e8f0", borderRadius: 12, overflow: "hidden", maxWidth: 640 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      ))}
    </div>
  );
}
