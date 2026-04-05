import postCategoryProps from "@/types/postCategoryTypes";

import Database from "../../public/svg/database.svg";
import FrontEnd from "../../public/svg/front-end.svg";

export const postCategoryList : postCategoryProps[] = [
    {
        title: "Front-End",
        icon: <FrontEnd/>,
        database_id: "c3a607dafaea484aaa958f33464d9055",
        path: "front-end"
    },
    {
        title: "Database",
        icon: <Database/>,
        database_id: "3a51f2c7e41e4ac399c908683140d7e6",
        path: "database"
    },
    {
        title: "Server-Making",
        icon: <FrontEnd/>,
        database_id: "c60ab93fb5664083944cf1645853b34d",
        path: "server-making"
    },
    {
        title: "Basic-Web",
        icon: <FrontEnd/>,
        database_id: "d24c35cb745148fc96476118a697a85e",
        path: "basic-web"
    },
    {
        title: "Git",
        icon: <FrontEnd/>,
        database_id: "457c8c25e91a4fb8b8f5876ac06f18c7",
        path: "git"
    },
    {
        title: "Settings",
        icon: <FrontEnd/>,
        database_id: "da65095bf3e141f48c6025ade35766cb",
        path: "settings"
    },
    {
        title: "Atmega-128",
        icon: <FrontEnd/>,
        database_id: "e403deb2bd844658900d4ab8bf680fc1",
        path: "atmega-128"
    },
]