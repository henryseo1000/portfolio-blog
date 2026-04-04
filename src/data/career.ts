import CareerProps from "@/types/careerTypes";
import { Carrois_Gothic } from "next/font/google";


const careers: CareerProps[] = [
    {
        title: "명지대학교 응용 보안 연구실",
        tag: ["2024 ~ 2025"],
        descriptionList: [
            "보안 / 구현된 코드로 코드 리뷰 진행", 
            "보안 이론(인코딩, 디코딩, 암호화) 공부 후 세미나 경험 있음", 
            "다양한 프로토콜과 네트워크, 통신에 대한 스터디 - HTTP, SSL, HTTPS 등"
        ]
    },
    {
        title: "교내 공학입문설계 수상",
        tag: ["2023", "임베디드", "공입설"],
        descriptionList: [
            "멋진, 향이 나는 액자 - 가습기를 이용한 향 분출 + 여러 사진을 보여주며 회전하는 액자", 
            "공학 입문 설계 작품", 
            "장려상 수상"
        ]
    },
    {
        title: "로봇 동아리 RATS",
        tag: ["2022 ~ ", "교내 동아리"],
        descriptionList: [
            "동아리를 들어가 임베디드(하드웨어)와 연계한 프로젝트 경험 보유", 
            "Spring 서버와 React-Native를 이용한 간단한 인프라 구축, API 연동"
        ]
    },
    {
        title: "자격증 & 외국어",
        tag: ["자격증", "어학"],
        descriptionList: [
            "정보처리산업기사 자격증 보유 (2024.06.18 취득)", 
            "영어, 일본어 - 일상생활 대화, 히라가나와 카타카나를 읽고 해석 가능"
        ]
    },
]

export default careers;