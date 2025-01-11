import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import universalLanguageDetect from "@unly/universal-language-detector";

import langNames from "@/json/language_names.json";
import { getSetting, setSetting } from "@/lib/settings.ts";

export const languages = Object.keys(langNames);
export const languageNames: Record<string, string> = langNames;

const fallbackLanguage = "en";
const systemLanguage = universalLanguageDetect({
    supportedLanguages: languages, // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: "en", // Fallback language in case the user's language cannot be resolved
});
export let storedLanguage: string;

const saveLanguage = async (lang: string): Promise<void> => {
    await setSetting("language", lang);
    storedLanguage = lang;
};

export const getLanguage = async (): Promise<string> => {
    let language = await getSetting("language");
    if (!language) {
        language = systemLanguage;
        await saveLanguage(language);
    }

    storedLanguage = language;
    return storedLanguage;
};

export const initializeI18n = async () => {
    const language = (await getLanguage()) || fallbackLanguage;

    const options = {
        loadPath: "/_locales/{{lng}}/translation.json",
    };
    const backend = new Backend(null, options);

    await i18n
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
    i18n.changeLanguage(lng).then(async () => {
        console.log("[Syrup] Language switched to", lng);
        await saveLanguage(lng);
    });
};

export default i18n;
