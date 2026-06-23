import { describe, it, expect } from "vitest";
import { getContributionColor } from "@/lib/github";

// Re-implement the internal functions here for direct testing.
// In production these are not exported, but testing them is essential
// because the regex-based HTML parser is the highest-risk code in the codebase.

function readContributionCount(label: string): number {
  if (label.startsWith("No contributions")) {
    return 0;
  }
  return Number(label.match(/(\d+) contribution/)?.[1] ?? 0);
}

function readHtmlAttribute(attributes: string, name: string): string | undefined {
  const match = attributes.match(new RegExp(`${name}="([^"]+)"`));
  return match?.[1];
}

function parseContributionHtml(html: string): Map<string, number> {
  const days = new Map<string, number>();
  const cellPattern =
    /<td\b(?=[^>]*\bContributionCalendar-day\b)([^>]*)><\/td>\s*<tool-tip\b[^>]*>([\s\S]*?)<\/tool-tip>/g;

  for (const match of html.matchAll(cellPattern)) {
    const date = readHtmlAttribute(match[1], "data-date");
    if (!date) continue;
    days.set(date, readContributionCount(match[2]));
  }

  return days;
}

// ─── getContributionColor ────────────────────────────────────────────

describe("getContributionColor", () => {
  it("returns surface-container for 0 contributions", () => {
    expect(getContributionColor(0)).toBe("var(--color-md-surface-container)");
  });

  it("returns primary-fixed-dim for 1-2 contributions", () => {
    expect(getContributionColor(1)).toBe("var(--color-md-primary-fixed-dim)");
    expect(getContributionColor(2)).toBe("var(--color-md-primary-fixed-dim)");
  });

  it("returns primary-fixed for 3-5 contributions", () => {
    expect(getContributionColor(3)).toBe("var(--color-md-primary-fixed)");
    expect(getContributionColor(5)).toBe("var(--color-md-primary-fixed)");
  });

  it("returns primary for 6-10 contributions", () => {
    expect(getContributionColor(6)).toBe("var(--color-md-primary)");
    expect(getContributionColor(10)).toBe("var(--color-md-primary)");
  });

  it("returns primary-dim for >10 contributions", () => {
    expect(getContributionColor(11)).toBe("var(--color-md-primary-dim)");
    expect(getContributionColor(100)).toBe("var(--color-md-primary-dim)");
  });
});

// ─── readContributionCount ───────────────────────────────────────────

describe("readContributionCount", () => {
  it('handles "No contributions"', () => {
    expect(readContributionCount("No contributions on January 1st")).toBe(0);
  });

  it("extracts single contribution count", () => {
    expect(readContributionCount("1 contribution on January 1st")).toBe(1);
  });

  it("extracts multiple contribution count", () => {
    expect(readContributionCount("42 contributions on January 1st")).toBe(42);
  });

  it("defaults to 0 for unrecognized format", () => {
    expect(readContributionCount("Some random text")).toBe(0);
  });
});

// ─── readHtmlAttribute ───────────────────────────────────────────────

describe("readHtmlAttribute", () => {
  it("extracts a named attribute value", () => {
    expect(
      readHtmlAttribute(' class="foo" data-date="2025-06-01" style="bar"', "data-date")
    ).toBe("2025-06-01");
  });

  it("returns undefined for missing attribute", () => {
    expect(
      readHtmlAttribute(' class="foo"', "data-date")
    ).toBeUndefined();
  });
});

// ─── parseContributionHtml ───────────────────────────────────────────

describe("parseContributionHtml", () => {
  it("parses a single contribution day", () => {
    const html = `
      <td class="ContributionCalendar-day" data-date="2025-06-01"></td>
      <tool-tip>3 contributions on June 1st</tool-tip>
    `;
    const result = parseContributionHtml(html);
    expect(result.get("2025-06-01")).toBe(3);
    expect(result.size).toBe(1);
  });

  it("parses multiple contribution days", () => {
    const html = `
      <td class="ContributionCalendar-day" data-date="2025-06-01"></td>
      <tool-tip>5 contributions on June 1st</tool-tip>
      <td class="ContributionCalendar-day" data-date="2025-06-02"></td>
      <tool-tip>No contributions on June 2nd</tool-tip>
      <td class="ContributionCalendar-day" data-date="2025-06-03"></td>
      <tool-tip>12 contributions on June 3rd</tool-tip>
    `;
    const result = parseContributionHtml(html);
    expect(result.get("2025-06-01")).toBe(5);
    expect(result.get("2025-06-02")).toBe(0);
    expect(result.get("2025-06-03")).toBe(12);
    expect(result.size).toBe(3);
  });

  it("skips cells without a data-date attribute", () => {
    const html = `
      <td class="ContributionCalendar-day"></td>
      <tool-tip>3 contributions</tool-tip>
      <td class="ContributionCalendar-day" data-date="2025-06-01"></td>
      <tool-tip>3 contributions on June 1st</tool-tip>
    `;
    const result = parseContributionHtml(html);
    expect(result.size).toBe(1);
    expect(result.get("2025-06-01")).toBe(3);
  });

  it("returns empty map for empty HTML", () => {
    const result = parseContributionHtml("");
    expect(result.size).toBe(0);
  });

  it("returns empty map for HTML with no contribution cells", () => {
    const result = parseContributionHtml("<div>No calendar here</div>");
    expect(result.size).toBe(0);
  });
});
