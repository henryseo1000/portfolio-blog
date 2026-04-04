import AnchorNav from "@/components/posts/AnchorNav";
import Comments from "@/components/posts/Comments";
import Navbar from "@/components/posts/Navbar";
import ProgressBar from "@/components/posts/ProgressBar";
import { Suspense } from "react";

import "./globals.css"

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ProgressBar position="top"/>
        <Navbar/>
        <Suspense>
          <AnchorNav/>
        </Suspense>
        <div className="prose dark:prose-invert">{children}</div>
        <Comments theme="github-dark"/>
      </body>
    </html>
  );
}