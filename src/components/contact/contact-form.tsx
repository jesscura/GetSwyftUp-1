"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [feedback, setFeedback] = useState("");

  const validate = () => {
    if (!form.name || !form.email || !form.message) return false;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return emailValid;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setStatus("error");
      setFeedback("Please add your name, a valid email, and a short message.");
      return;
    }
    setStatus("success");
    setFeedback("Demo form captured locally. Please email hello@getswyftup.com and we’ll follow up.");
  };

  return (
    <section id="contact-form" className="rounded-[var(--radius-card)] border border-white/8 bg-white/5 p-6 shadow-[var(--shadow-soft)]">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-semibold">Send a message</h2>
          <p className="text-sm text-muted">
            We’ll respond ASAP. If you prefer, you can also email{" "}
            <Link className="underline" href="mailto:hello@getswyftup.com">
              hello@getswyftup.com
            </Link>
            .
          </p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-muted" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted" htmlFor="email">
                Work email
              </label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="you@company.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted" htmlFor="company">
              Company
            </label>
            <Input
              id="company"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              placeholder="Company or team"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted" htmlFor="message">
              Message
            </label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="What can we help with?"
              required
            />
          </div>
          {status !== "idle" && (
            <p className={`text-sm ${status === "error" ? "text-[var(--brand-2)]" : "text-[var(--accent)]"}`}>{feedback}</p>
          )}
          <p className="text-xs text-muted">
            Note: This form currently collects details locally and will be connected to messaging shortly.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" className="w-full sm:w-auto">
              Send Message
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="mailto:hello@getswyftup.com?subject=Book%20a%20Demo">Book a Demo</Link>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
