import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import './i18n.ts';


createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
    </ThemeProvider>
);
