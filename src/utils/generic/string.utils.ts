
export function firstLetterUpperCase(word: string) {
    const firstWord = word.split("")[0].toUpperCase();
    return firstWord + word.substring(1);
}

export function replaceWithList(word: string,  replaceValues: Array<any> = [], expression: RegExp | string = "?",) {
    const lastValueIndex = replaceValues.length - 1;
    const splittedWord = word.split(" ");
    let replaceValuesIndex = 0;
    const result = splittedWord.map((value) => {
        const newWordResult = value === expression ? replaceValues[replaceValuesIndex] : value
        if (replaceValuesIndex < lastValueIndex) replaceValuesIndex++;
        return newWordResult;
    }).join(" ");
    return result.replaceAll(/\s{2,}/g, ' ');
}