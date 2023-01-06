import BaseRequest from "../../utils/libs/BaseRequest";

const helperRequest = new BaseRequest("helpers")

export default class HelperService {
    static findHelpersByCategorieName = (categorieName: string, languageCode?: string) => {
        return helperRequest.find({ params: {categorie_name: categorieName, language: languageCode} })
    }
}