'use client';

import AnchorNav from "@/components/posts/AnchorNav";
import Navbar from "@/components/posts/Navbar";
import ProgressBar from "@/components/posts/ProgressBar";

import { cn } from "@/utils/cn";
import { Suspense, useEffect, useRef, useState } from "react";

import "./globals.css"
import PageNav from "@/components/common/PageNav";
import SearchPalette from "@/components/common/SearchPalette";
import { Provider } from "react-redux";
import store from "@/store";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMini, setIsMini] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <Provider store={store}>
      <section className={cn(isMini ? "p-[15px] pl-[110px]" : "p-[15px] pl-[280px]")}>
        <ProgressBar position="top"/>
        <Navbar isMinimized={isMini} setIsMinimized={setIsMini}/>
        <Suspense>
          <AnchorNav/>
        </Suspense>
        <SearchPalette
          ref={dialogRef}
          open={open}
          setOpen={setOpen}
        />
        <div className="prose dark:prose-invert">{children}</div>
      </section>
    </Provider>
  );
}