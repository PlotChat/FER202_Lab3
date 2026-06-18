import { useContext, useState } from "react";
import { ModeContext } from "./ModeContext";
import useLocalStorage from "../hooks/useLocalStorage";

export const ModeProvider = ({ children }) => {
    const {getItem, setItem} = useLocalStorage();

    const context = useContext(ModeContext);

    const themes = {
        dark: { primary: "#121212", secondary: "#ffffff" },
        light: { primary: "#ffffff", secondary: "#000000" }
    }

    const [isDarkMode, setDarkMode] = useState(() => {
        const storedValue = getItem("isDarkMode");
        return storedValue === "true" || storedValue === true
    })

    const modeStyles = isDarkMode ? themes.dark : themes.light;

    const toggleMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            setItem("isDarkMode", newMode);
            return newMode;
        });
    }

    const values = {context, isDarkMode, setDarkMode, toggleMode, modeStyles };

	return <ModeContext.Provider value={values}>{children}</ModeContext.Provider>;
};

export default ModeProvider;
