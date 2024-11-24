"use client";

import { ReactNode } from "react";
import { GlobalStyle } from "./global-styles";

export function GlobalStyleProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <GlobalStyle />
            {children}
        </>
    );
}
