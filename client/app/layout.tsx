import type { Metadata } from "next";
import { Providers } from "./providers";
import Header from "@/components/header/header";

export const metadata: Metadata = {
  title: "Catalog products app",
  description: "Main page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
