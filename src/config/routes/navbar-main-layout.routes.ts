import LanguageTranslationJson from "../../types/LanguageTranslationJson";
import { NextNavRoute } from "../../types/NextNavRoute";

export const mainLayoutRoutes = (language: LanguageTranslationJson | any): NextNavRoute[]  => [
    {
        label: language?.generic?.login as string,
        route: "/auth/login"
    },
    {
        label: language?.generic?.sign_up as string,
        route: "/auth/sign-up"
    },
    {
        label: language?.generic?.home as string,
        route: "/"
    },
    {
        label: language?.generic?.myCards as string,
        route: "/cards"
    }
]