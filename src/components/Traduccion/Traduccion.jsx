import React from "react";
import { useTranslation } from "react-i18next";

const Traduccion = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t("welcome")}</h1>
            <p>{t("description")}</p>
        </div>
    );
};

export default Traduccion;
