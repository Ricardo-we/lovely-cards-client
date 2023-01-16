import * as yup from "yup";

import LanguageTranslationJson from "../../../types/LanguageTranslationJson";
import { replaceWithList } from "../../../utils/generic/string.utils";

export const cardMessageSchema = (language: LanguageTranslationJson) => yup.object({
    heading: yup
        .string()
        .required(replaceWithList(language?.notifications.requiredField, [language?.fields?.heading,]) || ""),
    content: yup.string(),
    color: yup.string(),
})