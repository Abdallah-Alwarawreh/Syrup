import { Button } from "@/components/ui/button";
import { getLanguage, languageNames, languages, switchLanguage } from "@/i18n";
import { useEffect, useState } from "react";
import CenteredScrollZone from "@/components/ui/CenteredScrollZone";

export function LanguageSwitcher() {
    // defaults to english, will be updated on mount
    const [language, setLanguage] = useState('en');
    const [languagePath, setLanguagePath] = useState(`/icons/${language}.svg`);

    const updateLanguage = (lang: string): void => {
        setLanguage(lang);
        setLanguagePath(`/icons/${lang}.svg`);
    }

    const toggleDropdown = () => {
        const wrapper = document.querySelector('.language') as HTMLDivElement;
        wrapper.classList.toggle('hidden');
    }

    useEffect(() => {
        getLanguage().then((lang: string) => {
            setLanguage(lang);
            setLanguagePath(`/icons/${lang}.svg`);
        });
    }, [])

    return (
        <div className="flex relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                    toggleDropdown();
                }}>
                <img src={languagePath} alt={language} className="h-[1.2rem] aspect-auto" />
            </Button>
            <CenteredScrollZone className="language">
                <div className="w-[60%] h-[100%] flex flex-col border-1 border-white border-opacity-70 bg-card rounded-lg dropdown-content">
                    {
                        languages.map((lang) => (
                            <div className="w-[100%] flex flex-row justify-start items-start" onClick={() => {
                                    switchLanguage(lang);
                                    toggleDropdown();
                                }}>
                                <Button onClick={() => {updateLanguage(lang);}} className="w-[100%] bg-card text-card-foreground flex flex-row items-start hover:text-primary hover:cursor-pointer hover:bg-primary/10">
                                    <img src={`/icons/${lang}.svg`} alt={lang} className="h-[1.2rem] w-[1.2rem] aspect-auto" />
                                    <p className="text-card-foreground text-sm ml-2 hover:cursor-pointer">{languageNames[lang]}</p>
                                </Button>
                            </div>
                        ))}
                    </div>
            </CenteredScrollZone>
        </div>
    );
}

export default LanguageSwitcher;
