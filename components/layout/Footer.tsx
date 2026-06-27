"use client";

import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { siteConfig } from "@/data/site-config";

const pages = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
  { label: "CV", href: "/cv" },
];

const socials = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Twitter", href: siteConfig.socials.twitter },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const name = "LAKSHAY";

  const letterVariants = {
    visible: (i: number) => ({
      translateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        duration: 0.4,
        delay: i * 0.04,
      },
    }),
    hidden: { translateY: 200 },
  };

  return (
    <footer
      className="relative w-full sm:pt-14 pt-8"
      style={{
        backgroundColor: "var(--color-bg-dark)",
        color: "var(--color-md-on-surface)",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        fontFamily: "var(--font-space-grotesk)",
      }}
    >
      <div className="sm:container px-8 md:px-16 mx-auto">
        <div className="md:flex justify-between w-full gap-12">
          {/* Left: tagline */}
          <div>
            <h1 className="md:text-4xl text-2xl font-bold tracking-tight">
              Let&rsquo;s do great work together
            </h1>
            <p
              className="pt-4 pb-6 md:text-lg text-base"
              style={{ color: "var(--color-md-on-surface-variant)" }}
            >
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:underline transition-colors"
                style={{ color: "var(--color-md-primary-fixed)" }}
              >
                {siteConfig.email}
              </a>
              {" — "}based in New Delhi, India
            </p>
          </div>

          {/* Right: Sitemap + Social */}
          <div className="flex gap-12 md:gap-16">
            <div>
              <h4
                className="text-sm uppercase tracking-widest pb-3 font-semibold"
                style={{ color: "var(--color-md-on-surface-variant)", opacity: 0.5 }}
              >
                Sitemap
              </h4>
              <ul className="flex flex-col gap-2 text-lg">
                {pages.map((page) => (
                  <li key={page.label}>
                    <Link
                      href={page.href}
                      className="font-medium hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-md-on-surface)" }}
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-sm uppercase tracking-widest pb-3 font-semibold"
                style={{ color: "var(--color-md-on-surface-variant)", opacity: 0.5 }}
              >
                Social
              </h4>
              <ul className="flex flex-col gap-2 text-lg">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-medium hover:opacity-70 transition-opacity"
                      style={{ color: "var(--color-md-on-surface)" }}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Animated name — letter by letter spring entrance */}
        <div
          ref={ref}
          className="border-y mt-10 md:py-8 py-6 text-center overflow-hidden"
          style={{ borderColor: "color-mix(in srgb, var(--color-md-on-surface) 8%, transparent)" }}
        >
          <h2
            className="font-black uppercase tracking-tighter leading-[0.9] select-none inline-flex"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
            }}
          >
            {name.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ color: "var(--color-md-primary-fixed)" }}
              >
                {letter}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Copyright bar */}
        <div
          className="flex md:flex-row flex-col-reverse gap-3 justify-between py-4 text-sm"
          style={{
            color: "var(--color-md-on-surface-variant)",
            opacity: 0.6,
          }}
        >
          <span>&copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</span>
          <a href="#" className="font-medium hover:opacity-70 transition-opacity">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
