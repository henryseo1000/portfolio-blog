'use client';

import PageNav from "@/components/common/PageNav";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section>
        <PageNav/>
        <div className="children">
          {children}
        </div>
      </section>
  );
}