import * as yup from "yup";

import LanguageTranslationJson from "../../../types/LanguageTranslationJson";
import { replaceWithList } from "../../../utils/generic/string.utils";

export const userSchema = (language: LanguageTranslationJson) => yup.object({
    username: yup.string()
        .required(replaceWithList(language?.notifications?.requiredField, [language?.fields["username"]]))
        .min(3, replaceWithList(language?.notifications?.minLength, [language?.fields["username"], 3])),
    password: yup.string()
        .required(replaceWithList(language?.notifications?.requiredField, [language?.fields["password"]]))
        .min(3, replaceWithList(language?.notifications?.minLength, [language?.fields["password"], 3])),
    email: yup.string()
        .required(replaceWithList(language?.notifications?.requiredField, [language?.fields["email"]]))
        .email(language?.notifications?.invalid)
    // password?: string;
    // email: string;
    // isActive: boolean;
})