import { createContext, useContext } from "react";

interface ThemeContextType {
    mode: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeMode = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useThemeMode must be used inside ThemeContext");
    }

    return context;
};