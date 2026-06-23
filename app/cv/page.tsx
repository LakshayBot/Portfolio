import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: `CV — ${siteConfig.name}`,
  description: `Curriculum Vitae of ${siteConfig.name} — ${siteConfig.title}`,
};

export default function CvPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-md-surface)" }}
    >
      <div className="max-w-2xl mx-auto px-8 py-20 text-center space-y-6">
        <h1
          className="text-4xl font-black uppercase tracking-tighter"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: "var(--color-md-on-surface)",
          }}
        >
          {siteConfig.name}
        </h1>
        <p
          className="text-xl"
          style={{ color: "var(--color-md-on-surface-variant)" }}
        >
          {siteConfig.title}
        </p>

        <div
          className="p-8 rounded-2xl mt-8"
          style={{
            backgroundColor: "var(--color-md-surface-container-lowest)",
            border: "1px solid var(--color-md-outline-variant)",
          }}
        >
          <span
            className="material-symbols-outlined mb-4 block"
            style={{
              fontSize: "3rem",
              color: "var(--color-md-primary)",
            }}
          >
            description
          </span>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-md-on-surface-variant)" }}
          >
            The downloadable CV is being updated. Please check back soon, or
            reach out directly at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline font-semibold"
              style={{ color: "var(--color-md-primary)" }}
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold mt-8 transition-colors duration-200 hover:opacity-70"
          style={{ color: "var(--color-md-primary)" }}
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to portfolio
        </a>
      </div>
    </main>
  );
}
