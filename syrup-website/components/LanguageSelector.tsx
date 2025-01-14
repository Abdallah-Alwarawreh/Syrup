"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateLocale } from "@/lib/update-locale";
import { useLocale, useTranslations } from "next-intl";

export function LanguageDropdown() {
    const defaultLocale = useLocale();
    const t = useTranslations("Languages");

    // add more languages here
    // and a fancy icon
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {t("languages")}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={defaultLocale} onValueChange={updateLocale}>
                    <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="ru">Русский</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
