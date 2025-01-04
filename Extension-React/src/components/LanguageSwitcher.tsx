import { Button } from "@/components/ui/button";
import i18n, { languageNames, languages, switchLanguage } from "@/i18n";
import { useState } from "react";

export function LanguageSwitcher() {
    const [language, setLanguage] = useState(i18n.language);

    const languagePath = (lang: string) => {
        return `/icons/${lang}.svg`;
    };

    return (
        <div className="relative group">
            <div className="flex">
                <Button variant="ghost" size="icon">
                    <img
                        src={languagePath(language)}
                        alt={language}
                        className="h-[1.2rem] aspect-auto"
                    />
                </Button>
                <div className="hidden group-hover:block absolute top-full right-0 z-10 pt-2">
                    <div className="border border-white/70 bg-accent rounded-lg max-h-[50vh] overflow-y-auto">
                        {languages.map((lang) => (
                            <div
                                key={lang}
                                className="flex flex-row items-center hover:bg-white/10 transition-colors px-3 py-2"
                                onClick={() => {
                                    switchLanguage(lang);
                                    setLanguage(lang);
                                }}
                            >
                                <Button variant="ghost" size="icon">
                                    <img
                                        src={languagePath(lang)}
                                        alt={lang}
                                        className="h-[1.2rem] w-[1.2rem] aspect-auto"
                                    />
                                </Button>
                                <p className="text-sm ml-2 cursor-pointer whitespace-nowrap">
                                    {languageNames[lang]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
