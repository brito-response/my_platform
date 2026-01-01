import { SunMoonIcon } from "lucide-react";

export const ToggleButtonTheme: React.FC = () => {

    const toggleTheme = () => {
        const html = document.documentElement;
        const isDark = html.classList.contains("dark");
        html.classList.toggle("dark", !isDark);
        localStorage.setItem("theme", !isDark ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme} className="px-4 py-2 dark:bg-gray-700 dark:text-amber-50 rounded-full">
            <SunMoonIcon size={14} />
        </button>
    );
};