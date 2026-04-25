import "server-only";
import { siteConfig } from "@/app/config/site";

export type EnquiryLead = {
  source: string;
  mode?: string;
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  propertyTitle?: string;
  propertyReference?: string;
  propertySlug?: string;
  advisorEmail?: string;
  submittedAt: string;
};

type MailProvider = "resend" | "sendgrid";

type SendEnquiryResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
    };

function configuredProvider(): MailProvider | null {
  const requestedProvider = process.env.ENQUIRY_MAIL_PROVIDER?.toLowerCase();

  if (requestedProvider === "resend" || requestedProvider === "sendgrid") {
    return requestedProvider;
  }

  if (process.env.RESEND_API_KEY) {
    return "resend";
  }

  if (process.env.SENDGRID_API_KEY) {
    return "sendgrid";
  }

  return null;
}

function recipientFor(lead: EnquiryLead) {
  return (
    process.env.ENQUIRY_RECIPIENT_EMAIL ||
    lead.advisorEmail ||
    siteConfig.contact.companyEmail
  );
}

function fromAddress() {
  return process.env.ENQUIRY_FROM_EMAIL || "";
}

function subjectFor(lead: EnquiryLead) {
  if (lead.propertyTitle) {
    return `Cervantes property enquiry: ${lead.propertyTitle}`;
  }

  return `Cervantes website enquiry: ${lead.interest || "General advisory"}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function leadRows(lead: EnquiryLead) {
  return [
    ["Source page", lead.source],
    ["Request type", lead.mode],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Interest", lead.interest],
    ["Property title", lead.propertyTitle],
    ["Property reference", lead.propertyReference],
    ["Property slug", lead.propertySlug],
    ["Message", lead.message],
    ["Submitted at", lead.submittedAt],
  ].filter((row): row is [string, string] => Boolean(row[1]));
}

function textBody(lead: EnquiryLead) {
  return leadRows(lead)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function htmlBody(lead: EnquiryLead) {
  const rows = leadRows(lead)
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #e7dcc1;color:#3f4724;">${escapeHtml(
          label
        )}</th><td style="padding:8px 12px;border-bottom:1px solid #e7dcc1;color:#222a18;">${escapeHtml(
          value
        ).replace(/\n/g, "<br />")}</td></tr>`
    )
    .join("");

  return `<div style="font-family:Arial,sans-serif;background:#f8f7f2;padding:24px;color:#222a18;">
  <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:400;margin:0 0 16px;">New Cervantes enquiry</h1>
  <table cellspacing="0" cellpadding="0" style="width:100%;max-width:720px;background:#fffaf0;border:1px solid #d8c58a;border-collapse:collapse;">${rows}</table>
</div>`;
}

async function sendViaResend(lead: EnquiryLead) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = fromAddress();

  if (!apiKey || !from) {
    return {
      ok: false,
      message: "Enquiry email is not configured. Please add RESEND_API_KEY and ENQUIRY_FROM_EMAIL.",
    } satisfies SendEnquiryResult;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipientFor(lead)],
      reply_to: lead.email,
      subject: subjectFor(lead),
      text: textBody(lead),
      html: htmlBody(lead),
    }),
  });

  if (!response.ok) {
    console.error("[Cervantes enquiry email] Resend failed", response.status, await response.text());
    return {
      ok: false,
      message: "The enquiry could not be sent right now. Please email Cervantes directly.",
    } satisfies SendEnquiryResult;
  }

  return { ok: true } satisfies SendEnquiryResult;
}

async function sendViaSendGrid(lead: EnquiryLead) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = fromAddress();

  if (!apiKey || !from) {
    return {
      ok: false,
      message: "Enquiry email is not configured. Please add SENDGRID_API_KEY and ENQUIRY_FROM_EMAIL.",
    } satisfies SendEnquiryResult;
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: recipientFor(lead) }],
          subject: subjectFor(lead),
        },
      ],
      from: { email: from },
      reply_to: { email: lead.email },
      content: [
        { type: "text/plain", value: textBody(lead) },
        { type: "text/html", value: htmlBody(lead) },
      ],
    }),
  });

  if (!response.ok) {
    console.error("[Cervantes enquiry email] SendGrid failed", response.status, await response.text());
    return {
      ok: false,
      message: "The enquiry could not be sent right now. Please email Cervantes directly.",
    } satisfies SendEnquiryResult;
  }

  return { ok: true } satisfies SendEnquiryResult;
}

export async function sendEnquiryEmail(lead: EnquiryLead): Promise<SendEnquiryResult> {
  const provider = configuredProvider();

  if (!provider) {
    return {
      ok: false,
      message:
        "Enquiry email is not configured yet. Please email Cervantes directly or try again later.",
    };
  }

  if (provider === "resend") {
    return sendViaResend(lead);
  }

  return sendViaSendGrid(lead);
}
