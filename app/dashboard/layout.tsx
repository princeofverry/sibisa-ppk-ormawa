import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/navbar/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SIBISA",
  description: "WEB APP BANK Sampah dengan fitur monitoring suhu kotoran sapi",
  icons: {
    icon: "/images/logo-sibisa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`poppins.className mx-auto`}>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
