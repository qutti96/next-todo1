import type { Metadata } from "next";

// import localFont from "next/font/local";

import { Noto_Sans_JP } from "next/font/google";
// import clsx from "clsx";

import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  // ,
  // weight: 'variable', // default なので不要。バリアブルフォントでなければ必要
  // display: 'swap', // default なので不要
  // preload: true, // default なので不要
  // adjustFontFallback: true, // next/font/google で default なので不要
  // fallback: ['system-ui', 'arial'], // local font fallback なので不要
});

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title:{
    template: '%s | nextjsを使用したtodoリスト',
    default: 'nextjsを使用したtodoリスト',
  },
  description: "nextjsを使用したtodoリスト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         className={`${notoSansJP.className}`}
      >
        <div className="w-full max-w-4xl md:w-auto px-10 py-10 my-10 mx-10 transition duration-500 ease-in-out transform bg-white rounded-lg">
          {/* <h1 className="font-bold mb-6 text-3xl text-center">Todo アプリ</h1> */}
          <div className="w-full mx-auto">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
