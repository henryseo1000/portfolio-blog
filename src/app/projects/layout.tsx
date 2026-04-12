'use client';

import PageNav from "@/components/common/PageNav";
import { Suspense } from "react";
import Loading from "../loading";
import {Provider} from 'react-redux'
import store from "@/store";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <section>
        <PageNav/>
        <Suspense fallback={<Loading/>}>
            <div>
              {children}
            </div>
        </Suspense>
      </section>
    </Provider>
  );
}