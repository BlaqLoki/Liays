"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const services = [
  "Website design & build",
  "Notion training",
  "Systems & consulting",
  "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");

  function validateField(name: string, value: string) {
    if (name === "name" && !value.trim()) return "Please share your name.";
    if (name === "email") {
      if (!value.trim()) return "Please share an email so we can reply.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "That email address doesn't look right.";
    }
    if (name === "message" && !value.trim()) return "Tell us a little about your project.";
    return "";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === "name" || name === "email" || name === "message") {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    const nextErrors: Errors = {
      name: validateField("name", data.name || "") || undefined,
      email: validateField("email", data.email || "") || undefined,
      message: validateField("message", data.message || "") || undefined,
    };
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      const firstInvalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(body.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setServerError("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-2xl border border-accent/40 bg-ink-soft p-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-ink">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight">Message sent</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Thanks for reaching out — we reply to every inquiry within one business day.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring cursor-pointer text-sm font-semibold text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/70">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="focus-ring w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-[var(--color-fg-on-ink)] placeholder:text-white/50"
            placeholder="Jordan Smith"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-accent-soft">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/70">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="focus-ring w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-[var(--color-fg-on-ink)] placeholder:text-white/50"
            placeholder="jordan@business.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-accent-soft">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white/70">
            Phone <span className="text-white/55">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="focus-ring w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-[var(--color-fg-on-ink)] placeholder:text-white/50"
            placeholder="(204) 555-0119"
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-white/70">
            What are you interested in?
          </label>
          <select
            id="service"
            name="service"
            defaultValue={services[0]}
            className="focus-ring w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-[var(--color-fg-on-ink)]"
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white/70">
          Tell us about your project <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="focus-ring w-full resize-none rounded-xl border border-white/15 bg-ink px-4 py-3 text-sm text-[var(--color-fg-on-ink)] placeholder:text-white/50"
          placeholder="A few sentences about your business and what you need."
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-accent-soft">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-accent-soft">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send message
            <ArrowUpRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}
