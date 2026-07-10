import type { Metadata } from "next"; import "./globals.css"; import { Nav } from "@/components/Nav";
export const metadata: Metadata = { title: "Fish Feed Formulation & Feeding Calculator", description: "Fish feeding ration and Pearson square formulation calculator" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Nav/><main className="mx-auto max-w-6xl p-4 md:p-8">{children}</main></body></html>}
