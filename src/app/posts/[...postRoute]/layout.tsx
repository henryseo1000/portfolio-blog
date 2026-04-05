'use client';

import AnchorNav from "@/components/posts/AnchorNav";
import Comments from "@/components/posts/Comments";
import Navbar from "@/components/posts/Navbar";
import ProgressBar from "@/components/posts/ProgressBar";
import { Suspense, useEffect, useState } from "react";

import "./globals.css"
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMini, setIsMini] = useState<boolean>(false);
  const [needComent, setNeedComment] = useState<boolean>(true);
  const location = usePathname();

  useEffect(() => {

    if (location.split('/').length === 3) {
      setNeedComment(false);
    }
    else {
      setNeedComment(true);
    }
  }, [location])

  return (
      <section className={cn(isMini ? "pl-[110px]" : "pl-[280px]")}>
        <ProgressBar position="top"/>
        <Navbar isMinimized={isMini} setIsMinimized={setIsMini}/>
        <Suspense>
          <AnchorNav/>
        </Suspense>
        <div className="prose dark:prose-invert">{children}</div>
        {needComent && <Comments theme="github-dark"/>}
      </section>
  );
}