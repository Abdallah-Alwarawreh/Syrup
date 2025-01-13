import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import Settings from "@/components/Settings.tsx";

createRoot(document.getElementById("root")!).render(
    <body className="w-[22rem] h-[35rem]">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App />
            <Settings />
        </ThemeProvider>
    </body>
);