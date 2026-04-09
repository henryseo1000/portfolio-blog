'use client';

import AnchorNav from "@/components/posts/AnchorNav";
import Navbar from "@/components/posts/Navbar";
import ProgressBar from "@/components/posts/ProgressBar";
import { cn } from "@/utils/cn";

import { Suspense, useState } from "react";

import "./globals.css"
import PageNav from "@/components/common/PageNav";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMini, setIsMini] = useState<boolean>(false);

  return (
      <section className={cn(isMini ? "pl-[110px]" : "pl-[280px]")}>
        <ProgressBar position="top"/>
        <Navbar isMinimized={isMini} setIsMinimized={setIsMini}/>
        <Suspense>
          <AnchorNav/>
        </Suspense>
        <div className="prose dark:prose-invert">{children}</div>
      </section>
  );
}