"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          subject: String(data.get("subject") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""),
        }),
      });

      const body = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok || !body.ok) {
        throw new Error(body.error || "Failed to send message.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks for reaching out. Your message has been sent.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-glow rounded-2xl p-5 md:p-6" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-[#d9e5ff]">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={80}
            className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none ring-[#4aa7ff] transition focus:ring-2"
          />
        </label>

        <label className="text-sm text-[#d9e5ff]">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={120}
            className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none ring-[#4aa7ff] transition focus:ring-2"
          />
        </label>
      </div>

      <label className="mt-4 block text-sm text-[#d9e5ff]">
        Subject
        <input
          required
          name="subject"
          maxLength={120}
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none ring-[#4aa7ff] transition focus:ring-2"
        />
      </label>

      <label className="mt-4 block text-sm text-[#d9e5ff]">
        Message
        <textarea
          required
          name="message"
          rows={5}
          maxLength={1200}
          className="mt-2 w-full rounded-xl border border-white/15 bg-[#0b1220] px-3 py-2 text-sm text-white outline-none ring-[#4aa7ff] transition focus:ring-2"
        />
      </label>

      <label className="hidden" aria-hidden>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 rounded-full bg-[#ff9c3d] px-6 py-3 text-sm font-semibold text-[#1a1105] transition hover:bg-[#ffb56f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      <p
        className={`mt-3 text-sm ${
          status === "error"
            ? "text-[#ffadad]"
            : status === "success"
              ? "text-[#9cf2c1]"
              : "text-[#9eb2d7]"
        }`}
        role="status"
      >
        {message || "I typically respond within 24 hours."}
      </p>
    </form>
  );
}
