export function getOtherLang(lang) {
    let langIndex;
    let otherLang;
    if (lang === 'en') {
        langIndex = 0;
        otherLang = 1;
    } else {
        langIndex = 1;
        otherLang = 0;
    }
    return otherLang;
}