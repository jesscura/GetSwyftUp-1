import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/lib/auth";
import { AuthProvider } from "@/components/auth/session-provider";

export const metadata: Metadata = {
  title: "SwyftUp | Global contractor payouts & billing",
  description:
    "Premium fintech workspace for onboarding contractors, issuing invoices, and paying teams across borders with clarity.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="bg-bg text-text">
      <body className="min-h-screen antialiased font-sans">
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
