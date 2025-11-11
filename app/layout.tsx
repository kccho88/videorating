import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "영상물 자체등급분류 검색 서비스",
  description: "넷플릭스, 티빙, 쿠팡플레이, 디즈니+ 등의 자체등급분류 영상물 정보를 검색할 수 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}


