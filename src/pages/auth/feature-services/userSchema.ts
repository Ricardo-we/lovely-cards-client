import * as yup from "yup";

import LanguageTranslationJson from "../../../types/LanguageTranslationJson";
import { replaceWithList } from "../../../utils/generic/string.utils";

export const userSchema = (language: LanguageTranslationJson) => yup.object({
    username: yup.string()
        .min(3, replaceWithList(language?.notifications?.minLength, [language?.fields["username"], 3])),
    email: yup.string().email(language?.notifications?.invalid)
    // password?: string;
    // email: string;
    // isActive: boolean;
})