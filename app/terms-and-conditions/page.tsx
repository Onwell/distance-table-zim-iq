"use client";
import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">Terms and Conditions</h1>
        <p className="mb-4 text-sm text-muted-foreground">Last updated: July 29, 2025</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">By accessing or using this application, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the app.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">2. Use of the App</h2>
        <p className="mb-4">This app is provided for informational purposes only. While we strive for accuracy, we do not guarantee the completeness, reliability, or accuracy of the information provided. Use the information at your own risk.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p className="mb-4">All content, trademarks, and data on this app, including but not limited to text, graphics, logos, and software, are the property of Smug Solutions or its licensors and are protected by applicable intellectual property laws.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="mb-4">Smug Solutions and its affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of or inability to use the app.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">5. User Conduct</h2>
        <p className="mb-4">You agree not to misuse the app, attempt to gain unauthorized access, or use the app for any unlawful purpose.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">6. External Links</h2>
        <p className="mb-4">This app may contain links to external websites. We are not responsible for the content or practices of these third-party sites.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="mb-4">We reserve the right to update or change these Terms and Conditions at any time. Continued use of the app after changes constitutes acceptance of those changes.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">8. Contact</h2>
        <p className="mb-4">For any questions about these Terms and Conditions, please contact <a href="https://smugsolutions.co.zw/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Smug Solutions</a>.</p>
      </div>
      {/* Footer */}
      <footer className="mt-8 sm:mt-12 py-6 sm:py-8 border-t border-border">
        <div className="text-center space-y-2">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <Link
              href="/disclaimer"
              className="text-xs sm:text-sm text-primary hover:underline"
            >
              Disclaimer
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-xs sm:text-sm text-primary hover:underline"
            >
              Terms & Conditions
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Copyright © 2025, developed by <span className="font-semibold text-foreground">Onwell Masaraure</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
