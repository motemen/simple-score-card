import "./globals.css";
import { BIZ_UDGothic, Inter } from "next/font/google";

const bizUDGothic = BIZ_UDGothic({
  weight: "400",
  variable: "--font-biz-ud-gothic",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={[bizUDGothic.variable, inter.variable, "font-sans"].join(" ")}
    >
      <body>{children}</body>
    </html>
  );
}
