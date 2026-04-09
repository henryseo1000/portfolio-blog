'use client';

import PageNav from "@/components/common/PageNav";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section>
        <PageNav menuList={[{menuTitle: "Projects View", path: "/projects", focused: true}, {menuTitle: "토이프로젝트 2025] 테스트", path: "projects/1", focused: false}]}/>
        <div>
          {children}
        </div>
      </section>
  );
}