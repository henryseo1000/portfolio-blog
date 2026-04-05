'use client';

import AnchorNav from "@/components/posts/AnchorNav";
import Comments from "@/components/posts/Comments";
import Navbar from "@/components/posts/Navbar";
import ProgressBar from "@/components/posts/ProgressBar";
import { Suspense, useState } from "react";

import "./globals.css"
import { cn } from "@/utils/cn";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMini, setIsMini] = useState<boolean>(true);

  return (
      <section className={cn(isMini ? "pl-[215px]" : "pl-[280px]")}>
        <ProgressBar position="top"/>
        <Navbar isMinimized={isMini} setIsMinimized={setIsMini}/>
        <Suspense>
          <AnchorNav/>
        </Suspense>
        <div className="prose dark:prose-invert">{children}</div>
        <Comments theme="github-dark"/>
      </section>
  );
}