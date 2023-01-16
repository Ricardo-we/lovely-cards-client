import * as yup from "yup";

import LanguageTranslationJson from "../../../types/LanguageTranslationJson";
import { replaceWithList } from "../../../utils/generic/string.utils";

export const cardImageWithUrlSchema = (language: LanguageTranslationJson) => yup.object({
    image_url: yup.string().required(replaceWithList(language?.notifications?.requiredField, [language?.fields?.imageUrl]))
})


export const cardImageWithFileSchema = (language: LanguageTranslationJson) => yup.object({
    image: yup.mixed()
        .required(replaceWithList(language?.notifications?.requiredField, [language?.fields?.image]))
})