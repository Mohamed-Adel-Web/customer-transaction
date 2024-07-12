"use client";

import { Inter } from "next/font/google";
import { ArrowRightLeft, CircleUser, BarChartIcon, CreditCardIcon } from "lucide-react";
import { LinkItem } from "@/types/types";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });
const links: LinkItem[] = [
  {
    href: "/",
    label: "Customers",
    icon: <CircleUser className="h-5 w-5" />,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: <CreditCardIcon className="h-5 w-5" />,
  },
  {
    href: "/statistics",
    label: "Statistics",
    icon: <BarChartIcon className="h-5 w-5" />,
  },
];
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <div className="flex min-h-screen w-full">
            <Sidebar links={links} />
            <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-20">
              <Header links={links} />
              <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
            </div>
          </div>
        </body>
      </QueryClientProvider>
    </html>
  );
}
