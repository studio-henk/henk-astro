import { ui, defaultLang } from "./ui";

type UiKeyType = keyof typeof ui;
type UiLangType = keyof (typeof ui)[typeof defaultLang];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as UiKeyType;
  return defaultLang;
}

export function useTranslations(lang: UiKeyType) {
  return function t(key: UiLangType) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}
