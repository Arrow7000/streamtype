import React from "react";
import styled from "styled-components";
import * as theme from "./Theme";

const lrPadding = 15;

const FAQStyled = styled.div`
    min-height: 100vh;
    z-index: 1;
    background-color: ${theme.bg};
    padding: 25px ${lrPadding}px 50px;
    display: grid;
    grid-template-columns: [home-main-col] 1fr;
    grid-template-rows: [home-main-row] 1fr;
    & h1 {
        font-size: 2.5rem;
        color: ${theme.headerText};
        font-weight: normal;
        text-align: center;
    }
    & h2 {
        font-size: 1.5rem;
        color: ${theme.subHeaderText};
        font-weight: normal;
    }
    & p {
        color: #ccc;
        font-size: 1.2rem;
    }
    & a {
        color: #eee;
    }

    @media screen and (min-width: ${500 + 2 * lrPadding}px) {
        grid-template-columns: 1fr [home-main-col] 500px 1fr;
    }
`;

const FAQContent = styled.div`
    grid-area: home-main-row / home-main-col;
`;

export function FAQs() {
    return (
        <FAQStyled>
            <FAQContent>
                <h1>FAQs</h1>
                <h2>What is Stream?</h2>
                <p>
                    Stream is a writing app that is not for the faint of heart:
                    if you stop writing for more than 5 seconds everything you
                    have written gets utterly erased.
                </p>
                <p>Irrevocably, irretrievably and irrecoverably.</p>
                <p>
                    After the time you have set expires you can continue writing
                    just as before, but the 5 second timeout will no longer
                    affect your writing. You can then copy and paste the text
                    into any Word file, Google Doc, or any other place you would
                    like to store your writing.
                </p>
                <h2>
                    Why does everything get deleted after 5 seconds of no
                    typing?
                </h2>
                <p>
                    In order to force the writer to focus completely on the
                    writing. With regular writing applications there are a
                    million different distractions begging for attention, and
                    with infinity time stretched ahead of you procrastination is
                    virtually inevitable. This app takes away the writer's
                    freedom to procrastinate.{" "}
                </p>
                <p>
                    We have returned the writer to the purity of a typewriter,
                    and refined the experience even further.{" "}
                </p>
                <p>
                    It is a drastic tool for people who finally want to get
                    their writing done, regardless of how much willpower they
                    thought they had.
                </p>
                <h2>
                    I've just had three hours' worth of work deleted! Can I get
                    it back?
                </h2>
                <p>
                    Unfortunately not. The 5 second timeout is a double edged
                    sword—ands she cuts deep. In order to focus the writer's
                    mind completely, the threat of erasure has to be complete.
                    This is the only way to ensure total focus; and it does
                    unfortunately mean that there is no way of recovering what
                    has been deleted.
                </p>
                <h2>Where do I start?</h2>
                <p>
                    Close this screen by clicking on the X in the top right
                    corner to get back to the main screen. From there you can
                    select the duration you want to be writing for, as well as
                    the typeface you would like to write in. Once you are ready
                    click the button labeled "Click here to start typing for x
                    minutes." This will start the app.
                </p>
                <h2>Sounds terrifying but I'll give it a go!</h2>
                <p>
                    Great! We recommend you start with a 1 minute session—or 5
                    minutes at most. This allows you to get a feel for the
                    typing rhythym you should be aiming for, without risking too
                    much.
                </p>
                <p>Happy writing!</p>
                <p>&ndash;&ndash;&ndash;</p>
                <p>
                    P.S. if you enjoy using the app or have any suggestions to
                    make please let me know either way on{" "}
                    <a href="mailto:aron@adler.dev" target="_blank">
                        aron@adler.dev
                    </a>
                    .
                </p>
            </FAQContent>
        </FAQStyled>
    );
}
