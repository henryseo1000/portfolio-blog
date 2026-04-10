import { ProjectProps } from "@/types/projectTypes";

const projectsList : ProjectProps[] = [
    {
        title: "2024 개인 프로젝트 #1] 동아리 도서 관리 인프라 제작",
        description: 'NextJS, Convex를 이용한 풀스택 동아리 도서 관리 인프라입니다.',
        tagList: ["TS", "Next JS", "Convex", "Full-Stack"],
        uuid : "8c3ca628b8c4474f8e4469ba89f5fbf6",
        thumbnailPath: "/thumbnails/project-1-thumbnail.png",
        link: "https://rats-book-service.vercel.app",
        gitRepo: "https://github.com/henryseo1000/rats-book-service"
    },
    {
        title: "토이 프로젝트 2025] 간단한 채팅앱 만들기",
        description: 'Redux를 공부하기 위해 만든 채팅앱입니다.',
        tagList: ["TS", "Convex", "React-Native", "Redux", "Full-Stack"],
        uuid : "15f7aafbf4aa8062b685d211ff2350a3",
        thumbnailPath: "/thumbnails/project-2-thumbnail.png",
        link: "https://youtu.be/APfuOW3J-x4?si=36CAYYY4KMh_9wfu",
        gitRepo: "https://github.com/henryseo1000/chat-app"
    },
    {
        title: "2026 개인 프로젝트 #1] Vercel + NextJS로 포트폴리오/블로그 페이지 만들기",
        description: '템플릿 없이 직접 디자인해 만드는 개인 포트폴리오/블로그입니다. Next JS로 제작하고 Vercel을 이용해 배포하였습니다.',
        tagList: ["TS", "NextJS", "Vercel"],
        uuid : "f2825ac744a947c0ae87db8d5011ede9",
        thumbnailPath: "/thumbnails/project-3-thumbnail.png",
        link: "https://henryseo1000.vercel.app/"
    },
    {
        title: "2026 토이 프로젝트] Playground",
        description: 'Github Pages를 이용해 만드는 나만의 웹 실험실',
        tagList: ["JS", "HTML", "CSS"],
        uuid : "33a7aafbf4aa80e4b94eebe97391a684",
        link: "https://henryseo1000.github.io"
    },
]

export default projectsList;