import React from "react";
import styled from "styled-components";
import { transparentize, darken } from "polished";
import LinkButton from "./LinkButton";
import * as theme from "./Theme";
import { timeParam } from "./config";

const HomeStyled = styled.div`
    height: 100vh;
    z-index: 1;
    background-color: ${theme.bg};
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

const SubHeader = styled.h2`
    margin-top: 0;
    font-size: 1.5rem;
    color: ${theme.subHeaderText};
    font-weight: normal;
`;

const Button = styled(LinkButton)`
    border: none;
    background-color: ${theme.buttonBg};
    color: ${theme.buttonPrimary};
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.8rem;
    margin: 0.4rem;
    font-weight: normal;
    box-shadow: 0 1px 5px ${transparentize(0.5, "black")};
    text-decoration: none;
    &:hover {
        background-color: ${darken(0.01, theme.buttonBg)};
    }
    &:active {
        background-color: ${darken(0.02, theme.buttonBg)};
    }
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export function Home() {
    return (
        <HomeStyled>
            <MainSection>
                <Header>Welcome to Stream.</Header>
                <SubHeader>Select your session duration</SubHeader>
                <ButtonRow>
                    {[1, 5, 10, 30, 60, 120].map(length => (
                        <Button
                            to={`/write?${timeParam}=${length * 60}`}
                            key={length}
                        >
                            {length}m
                        </Button>
                    ))}
                </ButtonRow>
            </MainSection>
        </HomeStyled>
    );
}
