
"use client";
import React from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">Disclaimer</h1>
        <p className="mb-4 text-sm text-muted-foreground">Last updated: July 29, 2025</p>
        <p className="mb-4">The information provided by this application is for general informational purposes only. All information on the app is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the app.</p>
        <p className="mb-4">Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the app or reliance on any information provided. Your use of the app and your reliance on any information is solely at your own risk.</p>
        <p className="mb-4">The app may contain links to other websites or content belonging to or originating from third parties. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the app.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">No Professional Advice</h2>
        <p className="mb-4">The information provided is not intended as, and shall not be understood or construed as, professional, legal, financial, or technical advice. Always seek the advice of a qualified professional with any questions you may have regarding your travels or vehicle requirements.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">User Responsibility</h2>
        <p className="mb-4">You are responsible for verifying any information before relying on it. We encourage users to double-check toll fees, distances, and travel requirements with official sources or authorities.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">Updates and Changes</h2>
        <p className="mb-4">We may update the content of this app at any time without notice. It is your responsibility to review this disclaimer periodically for any changes.</p>
        <h2 className="text-lg font-semibold mt-6 mb-2">Contact</h2>
        <p className="mb-4">If you have any questions, please contact <a href="mailto:support@smugsolutions.co.zw">support@smugsolutions.co.zw</a>.</p>
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
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Copyright © 2025, developed by <span className="font-semibold text-foreground">Onwell Masaraure</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
