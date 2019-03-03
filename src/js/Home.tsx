import React from "react";
import styled from "styled-components";
import { transparentize, darken } from "polished";
import LinkButton from "./LinkButton";
import * as theme from "./Theme";

const HomeStyled = styled.div`
    grid-area: main-row /  main-col / button-menu;
    z-index: 1;
    background-color: ${
        theme.bg
    }; // use polished.transparentize to see behind to editor
    /* background-color: ${transparentize(
        0.5,
        theme.bg
    )}; // use polished.transparentize to see behind to editor */
    padding: 0 50px;
    display: grid;
    grid-template-columns: [home-main-col] 1fr;

    grid-template-rows: 1fr [home-main-row] 1fr 1fr;

    @media screen and (min-width: 500px) {
        grid-template-columns: 1fr [home-main-col] 500px 1fr;
    }
`;

const MainSection = styled.div`
    grid-area: home-main-row / home-main-col;
    text-align: center;
`;

const Header = styled.h1`
    margin-top: 0;
    font-size: 2.5rem;
    color: ${theme.headerText};
    font-weight: normal;
`;

const Button = styled(LinkButton)`
    border: none;
    background-color: ${theme.buttonBg};
    color: ${theme.buttonPrimary};
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.8rem;
    font-weight: normal;
    box-shadow: 0 1px 5px ${transparentize(0.5, "black")};
    &:hover {
        background-color: ${darken(0.01, theme.buttonBg)};
    }
    &:active {
        background-color: ${darken(0.02, theme.buttonBg)};
    }
`;

export function Home() {
    return (
        <HomeStyled>
            <MainSection>
                <Header>Welcome to Stream.</Header>
                <Button to="/write">Go to editor</Button>
            </MainSection>
        </HomeStyled>
    );
}
