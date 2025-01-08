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
import { getLocale } from 'next-intl/server';

export function TestDropdown() {
    const defaultLocale = "en";

    // add more languages here
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                Languages
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value={defaultLocale} onValueChange={updateLocale}>
                    <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="qq">Test</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
