import React from "react";
import styled, { ThemeProviderProps } from "styled-components";
import { transparentize, lighten, darken } from "polished";
import LinkButton from "./LinkButton";
import * as theme from "./Theme";

const HomeStyled = styled.div`
    grid-row: main-row;
    grid-column: main-col;
    z-index: 1;
    background-color: ${theme.bg};
    padding: 0 50px;
    display: grid;
    grid-template-columns: [main-col] 1fr;

    grid-template-rows: 1fr [main-row] 1fr 1fr;

    @media screen and (min-width: 500px) {
        grid-template-columns: 1fr [main-col] 500px 1fr;
    }
`;

const MainSection = styled.div`
    grid-area: main-row / main-col;
    text-align: center;
`;

const Header = styled.h1`
    font-size: 2rem;
    color: ${theme.headerText};
    /* text-transform: uppercase; */
    /* font-family: "Bitter"; */
    font-weight: normal;
`;

const Button = styled(LinkButton)`
    border: none;
    background-color: ${theme.buttonBg};
    color: ${theme.buttonPrimary};
    cursor: pointer;
    font-size: 1rem;
    padding: 0.8rem;
    font-weight: bold;
    box-shadow: 0 3px 5px ${transparentize(0.5, "black")};
    &:hover {
        background-color: ${darken(0.05, theme.buttonBg)};
    }
    &:active {
        background-color: ${darken(0.1, theme.buttonBg)};
    }
`;

export function Home() {
    return (
        <HomeStyled>
            <MainSection>
                <Header>Welcome to Stream</Header>
                <Button to="/write">Go to editor</Button>
            </MainSection>
        </HomeStyled>
    );
}
