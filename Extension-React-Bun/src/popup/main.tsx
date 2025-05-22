import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/popup/App.tsx";
import { ThemeProvider } from "@/popup/components/ThemeProvider.tsx";
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
    <body className="w-[22rem] h-[35rem] overflow-hidden">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
            <Toaster />
        </ThemeProvider>
    </body>
);