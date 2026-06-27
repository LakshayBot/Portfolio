import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { GridBackground } from "@/components/layout/GridBackground";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/data/site-config";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LAKSHAY.DEV",
  description:
    "Full Stack Developer — React, Next.js, Node.js, TypeScript. Building scalable, efficient solutions.",
  icons: {
    icon: "/brand-icon.jpg",
  },
  openGraph: {
    title: "LAKSHAY.DEV — Full Stack Developer",
    description:
      "React, Next.js, Node.js, TypeScript. Building scalable, efficient solutions.",
    url: "https://lakshay.dev",
    siteName: "LAKSHAY.DEV",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LAKSHAY.DEV — Full Stack Developer",
    description:
      "React, Next.js, Node.js, TypeScript. Building scalable, efficient solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Material Symbols — subsetted to only the 10 icons used across the site.
            Avoids loading all 2,500+ glyphs (3,864 KiB → ~30 KiB). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Material Symbols — loaded non-blocking via media=print swap trick */}
        <link
          href={
            "https://fonts.googleapis.com/css2" +
            "?family=Material+Symbols+Outlined" +
            ":opsz,wght,FILL@20..48,100..700,0..1" +
            "&icon_names=expand_more,architecture,dynamic_form,database" +
            ",precision_manufacturing,mail,error,warning,arrow_back,description" +
            "&display=swap"
          }
          rel="stylesheet"
          media="print"
          suppressHydrationWarning
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.querySelector('link[media="print"][href*="Material+Symbols"]').onload=function(){this.media="all";this.onload=null}`,
          }}
        />
        {/* JSON-LD structured data for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.url,
              jobTitle: siteConfig.title,
              sameAs: [
                siteConfig.socials.github,
                siteConfig.socials.linkedin,
                siteConfig.socials.twitter,
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GridBackground />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
