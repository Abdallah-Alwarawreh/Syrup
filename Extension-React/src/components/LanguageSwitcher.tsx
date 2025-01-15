import { getLanguage, languageNames, languages, switchLanguage } from "@/i18n";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
    // defaults to english, will be updated on mount
    const [language, setLanguage] = useState('en');
    const [languagePath, setLanguagePath] = useState(`/icons/${language}.svg`);

    const updateLanguage = (lang: string): void => {
        setLanguage(lang);
        setLanguagePath(`/icons/${lang}.svg`);
    }

    useEffect(() => {
        getLanguage().then((lang: string) => {
            setLanguage(lang);
            setLanguagePath(`/icons/${lang}.svg`);
        });
    }, [])

    return (
        <select name="" id="" onChange={(e) => { switchLanguage(e.target.value); updateLanguage(e.target.value); }} value={language} className="bg-card text-card-foreground rounded-lg">
            {languages.map((lang) => (
                <option value={lang}><img src={languagePath} alt={lang} /><span className="text-sm">{languageNames[lang]}</span></option>
            ))}
        </select>
    );
}

export default LanguageSwitcher;
