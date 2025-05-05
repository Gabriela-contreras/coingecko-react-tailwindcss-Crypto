import React from "react";
import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
    const { i18n } = useTranslation();

    // Function to change the language
    const toggleLanguage = () => {
        const newLanguage = i18n.language === "es" ? "en" : "es";
        i18n.changeLanguage(newLanguage);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
            {i18n.language === "es" ? "English" : "Español"}
        </button>
    );
};

export default LanguageToggle;