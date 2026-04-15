import { NextRequest, NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

const WINDOW_MS = 60_000;
const LIMIT_PER_WINDOW = 5;
const recentRequests = new Map<string, number[]>();

function trim(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanOldTimestamps(now: number) {
  for (const [key, timestamps] of recentRequests.entries()) {
    const fresh = timestamps.filter((stamp) => now - stamp < WINDOW_MS);
    if (fresh.length === 0) {
      recentRequests.delete(key);
    } else {
      recentRequests.set(key, fresh);
    }
  }
}

function validate(payload: Payload) {
  if (payload.website) return "Spam detected.";
  if (payload.name.length < 2 || payload.name.length > 80) return "Please enter a valid name.";
  if (payload.subject.length < 4 || payload.subject.length > 120) return "Please enter a valid subject.";
  if (payload.message.length < 10 || payload.message.length > 1200) return "Please enter a valid message.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 120) {
    return "Please enter a valid email.";
  }

  return null;
}

export async function POST(request: NextRequest) {
  const now = Date.now();
  cleanOldTimestamps(now);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipRequests = recentRequests.get(ip) || [];

  if (ipRequests.length >= LIMIT_PER_WINDOW) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let raw: unknown;

  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const payload: Payload = {
    name: trim((raw as Payload).name),
    email: trim((raw as Payload).email),
    subject: trim((raw as Payload).subject),
    message: trim((raw as Payload).message),
    website: trim((raw as Payload).website),
  };

  const error = validate(payload);

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  ipRequests.push(now);
  recentRequests.set(ip, ipRequests);

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      {
        ok: false,
        error: "Contact service is not configured. Add RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL.",
      },
      { status: 500 }
    );
  }

  const emailBody = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `Portfolio Contact: ${payload.subject}`,
      text: emailBody,
    }),
  });

  if (!resendResponse.ok) {
    return NextResponse.json(
      { ok: false, error: "Message service failed. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
