import { useTranslation } from "react-i18next";

export default function customDatabase() {
    const { t } = useTranslation();

    const handleDatabase = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (inputValue === '') {
            localStorage.removeItem('database');
            return;
        }
        try {
            const url = new URL(inputValue);
            fetch(url.toString())
                .then(() => {
                    localStorage.setItem('database', inputValue);
                    const updated = document.querySelector('#customDatabase .update') as HTMLParagraphElement;
                    updated.classList.remove('hidden');
                    setTimeout(() => {
                        updated.classList.add('hidden');
                    }, 2000);
                })
                .catch(() => {
                    const error = document.querySelector('#customDatabase .invalid') as HTMLParagraphElement;
                    error.classList.remove('hidden');
                    setTimeout(() => {
                        error.classList.add('hidden');
                    }, 2000);
                });
        } catch (e) {
            const error = document.querySelector('#customDatabase .invalid') as HTMLParagraphElement;
            error.classList.remove('hidden');
            setTimeout(() => {
                error.classList.add('hidden');
            }, 2000);
        }
    }

    return (
        <div id="customDatabase" className="flex flex-col">
            <input onChange={handleDatabase} className="bg-card border-white border-1 rounded-sm" type="url" name="" id="" defaultValue={localStorage.getItem("database") || ''} />
            <p className="text-xs">{t("leave_empty_default")}</p>
            <p className="update hidden">{t("Updated")}</p>
            <p className="invalid text-red hidden">{t("url_invalide")}</p>
        </div>
    );
}