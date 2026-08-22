import React from "react";
import { cinzel } from "../../../fonts";
import Divider from "@mui/material/Divider";
import DividerCustome from "../../themes/divider-medival";

export default function Approch() {
    return (
        <div>
            <div className="flex h-[35vh] flex-col items-center justify-center gap-3 px-6 text-center">
                <DividerCustome />
                <h2
                    className={`${cinzel.className} text-3xl font-semibold text-foreground sm:text-4xl`}
                >
                    Titre du thème
                </h2>
                <h4 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                    Sous titre
                </h4>
                <p className="mt-2 max-w-xl leading-relaxed text-gray-600 dark:text-gray-400">
                    Je suis un texte qui va présenter les thèmes que je couvre, comment je
                    les transmets, en parlant des lieux, d&apos;émotion, de vision pour
                    permettre au futur client de se projeter dans une potentielle
                    prestation à venir.
                </p>
            </div>
        </div>
    );
}