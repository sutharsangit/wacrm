import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeSync from "@/components/theme/ThemeSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "WACRM | AI Lead Qualification & WhatsApp CRM",
  description: "Qualify your marketing ads leads automatically on WhatsApp before they cool down and manage them in a robust CRM dashboard.",
  keywords: ["WhatsApp CRM", "Lead Qualification", "AI CRM", "Meta Ads Sync", "SaaS Dashboard"],
  authors: [{ name: "WACRM Development Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('auth_theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.add('light-theme');
                    document.body.classList.add('light-theme');
                  } else {
                    document.documentElement.classList.remove('light-theme');
                    document.body.classList.remove('light-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans h-full antialiased`}>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
