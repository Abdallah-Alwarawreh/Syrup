import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import universalLanguageDetect from "@unly/universal-language-detector";

import langNames from "@/json/language_names.json";

export const languages = Object.keys(langNames);
export const languageNames: Record<string, string> = langNames;
const fallbackLanguage = "en";
let storedLanguage: string;

const getLanguage: Promise<string> = chrome.storage.sync.get().then((data) => {
    storedLanguage = data["language"];

    if (!storedLanguage) {
        storedLanguage = universalLanguageDetect({
            supportedLanguages: languages, // Whitelist of supported languages, will be used to filter out languages that aren't supported
            fallbackLanguage: "en", // Fallback language in case the user's language cannot be resolved
        });
    }

    return storedLanguage;
});

const saveLanguage = (lang: string): void => {
    chrome.storage.sync.set(
        {
            language: lang,
        },
        () => {
            storedLanguage = lang;
        }
    );
};

export const initializeI18n = async () => {
    const language = (await getLanguage) || fallbackLanguage;

    const options = {
        loadPath: "/_locales/{{lng}}/translation.json",
    };
    const backend = new Backend(null, options);

    i18n
        // load translations using http from /public/_locales
        .use(backend)
        // passes i18n to react-i18next
        .use(initReactI18next)
        .init({
            lng: language,
            fallbackLng: fallbackLanguage,
            interpolation: {
                escapeValue: false,
            },
        });
};

initializeI18n();

export const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    saveLanguage(lng);
};

export default i18n;
