import en from "../../config/languages/en.json";
import es from "../../config/languages/es.json";

const LOCAL_LANGUAGES =  new Map();
LOCAL_LANGUAGES.set("en",en);
LOCAL_LANGUAGES.set("es",es);


export class LanguageService {

    static getLanguage(languageCode: string="es"){
        return LOCAL_LANGUAGES.get(languageCode) ?? en; 
    }
}