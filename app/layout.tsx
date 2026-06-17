import type React from "react"
import type { Metadata } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zimbabwe Distance Calculator",
  description: "Calculate distances and travel times between major cities in Zimbabwe",
  generator: "",
  // --- ADD THIS SECTION FOR FAVICON ---
  icons: {
    icon: '/favicon.png', // Path to your PNG favicon in /public
    // You can add more icons here if you have different sizes or formats
    // For example:
    // apple: '/apple-touch-icon.png', // If you have an Apple Touch icon
  },
  // ------------------------------------
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${inter.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
