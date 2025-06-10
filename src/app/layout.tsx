import Link from "next/link";
import { Gugi } from 'next/font/google';
import { Noto_Sans_KR } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";
import SubTitle from '@/components/SubTitle/SubTitle';
import { Providers } from './providers'; 

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
        <Providers>
          <div className="navbar">
            <Link href="/" className={`title ${gugi.className}`}>
              이시대<br /><span className="title-2">맛집</span>
            </Link>
            <div className="speech-bubble">
              <SubTitle text="Trending Restaurants of UOS" />
            </div>
          </div>
          {children} {/* page.js */}
        </Providers>
      </body>
    </html>
  );
}