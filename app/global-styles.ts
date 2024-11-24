"use client";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
    }

    h1 {
        color: #50a648;
    }

    input, button {
        font-size: 1rem;
        padding: 10px;
        margin: 5px 0;
    }

    button {
        background-color: #50a648;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
            background-color: #50a648;
        }
    }
`;
