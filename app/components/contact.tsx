"use client";
import { useState } from "react";
import {
  LuArrowUpRight as ArrowUpRight,
  LuCheck as Check,
  LuCopy as Copy,
  LuMail as Mail,
} from "react-icons/lu";

const EMAIL = "guptas3067@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="page-shell content-section contact-section">
      <div className="section-heading">
        <p className="code-caption">&lt;!-- contact --&gt;</p>
        <h2>Get in touch</h2>
      </div>
      <p className="contact-copy">
        Let&apos;s build something that works beautifully and delivers real value.
      </p>
      <div className="contact-actions">
        <a href={`mailto:${EMAIL}`} className="email-link">
          <Mail size={15} /> {EMAIL} <ArrowUpRight size={13} />
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="copy-button"
        >
          {copied ? <Check size={15} /> : <Copy size={14} />}
        </button>
        <span aria-live="polite" className="copy-status">
          {copied ? "Copied" : ""}
        </span>
      </div>
    </section>
  );
}