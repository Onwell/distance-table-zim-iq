
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="text-blue-600 hover:underline font-semibold text-lg">
        Go back home
      </Link>
    </div>
  );
}
