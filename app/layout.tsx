import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = "https://this-did-not-need-an-app.vercel.app";

const siteDescription =
  "A completely unnecessary website for investigating tiny everyday problems and turning your overthinking into an unnecessarily official case file.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "THIS DID NOT NEED AN APP",
  description: siteDescription,
  openGraph: {
    title: "THIS DID NOT NEED AN APP",
    description: siteDescription,
    url: siteUrl,
    siteName: "THIS DID NOT NEED AN APP",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "THIS DID NOT NEED AN APP — Department of Unnecessary Investigations",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THIS DID NOT NEED AN APP",
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
