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
// import { updateLocale } from "@/lib/update-locale";


export function TestDropdown() {
    const defaultLocale = "en";
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                Languages
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Languages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={defaultLocale} onValueChange={console.log}>
                    <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="qq">Test</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

