import { useTheme, Theme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";

export default function ThemeSwitcher() {
    const { setTheme } = useTheme();
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
        <select value={theme} className="bg-card text-card-foreground rounded-lg" onChange={(e) => {setTheme(e.target.value as Theme);}}>
            <option value="light">{t('Light')}</option>
            <option value="dark">{t('Dark')}</option>
            <option value="system">{t('System')}</option>
        </select>
    );
}