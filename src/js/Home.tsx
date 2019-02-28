import React from "react";
import styled from "styled-components";
import LinkButton from "./LinkButton";

const HomeStyled = styled.div`
    grid-row: main-row;
    grid-column: main-col;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.8);
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

export function Home() {
    return (
        <HomeStyled>
            <MainSection>
                <h1>Welcome to Stream</h1>

                {/* <Link to="/write">{() => <button>Go to editor</button>}</Link> */}
                <LinkButton to="/write">Go to editor</LinkButton>
            </MainSection>
        </HomeStyled>
    );
}
