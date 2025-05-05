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
            className="px-3 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
            {i18n.language === "es" ? "English" : "Español"}
        </button>
    );
};

export default LanguageToggle;