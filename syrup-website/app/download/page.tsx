import Link from "next/link";
import { ChevronLeft } from "lucide-react"

import { useTranslations } from 'next-intl';

// This page is supposed to redirect the user to its browser's extension marketplace,
// and to provide links to manually go to the right extension store
export default function Page() {
    const t = useTranslations("Download");
    return <div className="m-2 flex flex-col">
        <Link href="/" className="text-blue-500 flex flex-row hover:underline my-1"><ChevronLeft />{t("go-back")}</Link>
        <p>{t("redirecting")}</p>
        {t("links")}
        <ul className="list-disc">
            <li><Link href="https://chromewebstore.google.com/detail/syrup/odfgjmajnbkiabjnfiijllkihjpilfch" className="text-blue-500 flex flex-row hover:underline mx-1">
                {t("chromium")}
            </Link></li>
            <li><Link href="https://addons.mozilla.org/en-US/firefox/addon/syrup/" className="text-blue-500 flex flex-row hover:underline mx-1">
                {t("firefox")}
            </Link></li>
        </ul>
    </div>
}
