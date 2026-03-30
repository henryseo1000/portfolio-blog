import AnchorNav from "@/components/posts/AnchorNav";
import Comments from "@/components/posts/Comments";
import Navbar from "@/components/posts/Navbar";
import ProgressBar from "@/components/posts/ProgressBar";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col bg-[#222222]">
        <ProgressBar position="top"/>
        <Navbar/>
        <AnchorNav/>
        <div className="prose dark:prose-invert">{children}</div>
        <Comments theme="github-dark"/>
      </body>
    </html>
  );
}