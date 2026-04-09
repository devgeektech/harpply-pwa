// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "@repo/ui/globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// })

// import type { Metadata, Viewport } from "next";
// import { Inter, Cormorant_Garamond } from "next/font/google";
// import Script from "next/script";
// import { ToasterProvider } from "@/components/toaster-provider";
// import "@repo/ui/globals.css";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// const cormorant = Cormorant_Garamond({
//   variable: "--font-cormorant",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   style: ["normal", "italic"],
// });

// export const metadata: Metadata = {
//   title: "Harpply — Where Christian Singles Meet",
//   description:
//     "Harpply – Where Christian Singles Meet. Faith-centred connections built on shared values, community, and purpose.",
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "black-translucent",
//     title: "Harpply",
//   },
// };

// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
//   viewportFit: "cover",
//   themeColor: "#0c0520",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link
//           rel="apple-touch-icon"
//           href="/images/favicon.png"
//           type="image/png"
//         />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta
//           name="apple-mobile-web-app-status-bar-style"
//           content="black-translucent"
//         />
//       </head>
//       {/* <body className={`${inter.variable} font-sans antialiased`}> */}
//       <body
//         className={`${inter.variable} ${cormorant.variable} antialiased`}
//         style={{ margin: 0, padding: 0 }}
//       >
//         {children}
//         <ToasterProvider />
//         <Script
//           id="termly-resource-blocker"
//           src="https://app.termly.io/resource-blocker/4725f758-9ac0-4e26-9d2c-dabb9261ac08?autoBlock=on"
//           strategy="afterInteractive"
//         />
//       </body>
//     </html>
//   );
// }

import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import { ToasterProvider } from "@/components/toaster-provider";
import "@repo/ui/globals.css";
import LayoutWrapper from "@/components/common/layout-wrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Harpply — Where Christian Singles Meet",
  description:
    "Harpply – Where Christian Singles Meet. Faith-centred connections built on shared values, community, and purpose.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Harpply",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c0520",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          href="/images/favicon.png"
          type="image/png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      {/* <body className={`${inter.variable} font-sans antialiased`}> */}
      <body
        className={`${inter.variable} ${cormorant.variable} antialiased`}
        style={{ margin: 0, padding: 0 }}
      >
        {/* {children} */}
        <LayoutWrapper>{children}</LayoutWrapper>

        <ToasterProvider />
        <Script
          id="termly-resource-blocker"
          src="https://app.termly.io/resource-blocker/4725f758-9ac0-4e26-9d2c-dabb9261ac08?autoBlock=on"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
