import { APP_CONFIG } from "../../config/app-settings";

export function generateStorageKey(uniqueKey: string){
    return `${APP_CONFIG.appName}-${uniqueKey}` 
}