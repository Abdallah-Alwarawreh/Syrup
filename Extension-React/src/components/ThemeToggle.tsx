import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
    const { setTheme } = useTheme();
    const { theme: currentTheme } = useTheme();

    const { t } = useTranslation();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t('Toggle theme')}</span>
        </Button>
    );
}
