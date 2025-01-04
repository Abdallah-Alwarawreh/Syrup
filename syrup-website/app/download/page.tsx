import Link from "next/link";
import { ChevronLeft } from "lucide-react"

// This page is supposed to redirect the user to its browser's extension marketplace,
// and to provide links to manually go to the right extension store
export default function Page() {
    return <div className="m-2 flex flex-col">
        <Link href="/" className="text-blue-500 flex flex-row hover:underline my-1"><ChevronLeft />Go back to the home page</Link>
        <p>Redirecting to your browser's extension marketplace ...</p>
        If there is any problem with redirection, use the following links:
        <ul className="list-disc">
            <li><Link href="https://chromewebstore.google.com/detail/syrup/odfgjmajnbkiabjnfiijllkihjpilfch" className="text-blue-500 flex flex-row hover:underline mx-1">
                For chromium-based browsers (Microsoft Edge, Google Chrome, Brave or Opera)
            </Link></li>
            <li><Link href="https://addons.mozilla.org/en-US/firefox/addon/syrup/" className="text-blue-500 flex flex-row hover:underline mx-1">
                For Mozilla Firefox
            </Link></li>
        </ul>
    </div>
}