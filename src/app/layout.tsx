import Link from "next/link";
import Image from "next/image";
import { Gugi } from 'next/font/google';
import { Noto_Sans_KR } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

/* 구글 폰트 */
const gugi = Gugi({
  weight: '400',
  subsets: ['latin'], // 사용할 문자 집합
});

const notoSans = Noto_Sans_KR({
  weight: ['400', '700'], // 필요에 따라 가중치 조절
  subsets: ['latin'],
  display: 'swap',
});

/* 검색 엔진 */
export const metadata: Metadata = {
  title: "이시대맛집", // 브라우저에 표시될 제목
  description: "Trending Restaurants of UOS", // 검색 엔진에서 페이지 설명
};

/* children(page)을 읽기 전용으로 불러옴 */
export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <div className="navbar">
          <Link href="/" className={`title ${gugi.className}`}>
            이시대<br /><span className="title-2">맛집</span>
          </Link>
            <span className="description">Trending Restaurants of UOS</span>
        </div>
          {children} {/* page.js */}
      </body>
    </html>
  );
}