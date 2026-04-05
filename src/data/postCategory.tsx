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
        title: "Server",
        icon: <FrontEnd/>,
        database_id: "295e3d039ba744e996443ae894781977",
        path: "server"
    }
]