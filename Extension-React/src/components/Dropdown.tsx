import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Ellipsis, Settings } from "lucide-react";

const Dropdown: React.FC = () => {
    return (
        <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => {
                    const dropdown = document.querySelector('.dropdown') as HTMLDivElement;
                    dropdown.classList.toggle('hidden');
                }}><Ellipsis />
            </Button>
            <div className="dropdown flex flex-col absolute hidden bg-card rounded-lg">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={() => {
                        const settings = document.querySelector('.settings') as HTMLDivElement;
                        const dropdown = document.querySelector('.dropdown') as HTMLDivElement;
                        settings.classList.toggle('hidden');
                        dropdown.classList.toggle('hidden');
                    }}><Settings className="transition-transform duration-300 hover:rotate-45"/>
                </Button>
            </div>
        </div>
    );
}

export default Dropdown;