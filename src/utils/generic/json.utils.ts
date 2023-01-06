    
export function safeJsonParse(value?: string | null){
    if(!value) return {};
    try {
        return JSON.parse(value)
    } catch (error) {
        return {}
    }
}