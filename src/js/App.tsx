import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Route,
    withRouter,
    RouteComponentProps
} from "react-router-dom";
import styled from "styled-components";

import Editor from "./Editor";
import useEditor from "./useEditor";
import useInterval from "./useInterval";

import bibleVerses from "./bibleVerses";
import { Home } from "./Home";
import useTimeout from "./useTimeout";

const bottomButtonRowHeight = 50;

interface CustomRouteComponentProps {
    path: string;
}

const EditorView = ({
    location,
    path
}: RouteComponentProps & CustomRouteComponentProps) => {
    // const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const [sessionTimeLeft, setSessionTimeLeft] = useState(10 * 1000);
    const [stopped, setStopped] = useState(false);

    const msUntilDeletion = 5000; // change before committing

    const isWriteRoute = location.pathname === path;

    const editorProps = useEditor(isWriteRoute && !stopped, msUntilDeletion);
    const { changeText, text } = editorProps;

    // const allVerses = bibleVerses.join("\n\n") + "\n\n";

    useTimeout(() => {
        console.log("Session finished!");
        setStopped(true);
    }, sessionTimeLeft);

    useInterval(() => {
        // if (
        //     text === "" ||
        //     (!isWriteRoute && currentCharIndex <= allVerses.length)
        // ) {
        //     changeText(old => old + allVerses[currentCharIndex]);
        //     setCurrentCharIndex(current => (current + 1) % allVerses.length);
        // }

        if (!isWriteRoute) {
            changeText(old => old + "a ");
        }
    }, 100);

    return <Editor {...editorProps} isInView={isWriteRoute} />;
};

const EditorViewWithRouter = withRouter(EditorView);

const AppStyled = styled.div`
    display: grid;
    grid-template-columns: [main-col] 1fr;
    grid-template-rows: [main-row] 1fr [button-row-split] ${bottomButtonRowHeight}px [button-menu];
    height: 100vh;
`;

/**
 * # App states
 *
 * On Homepage:
 *  Sample text gets typed in background. Fades when stopped.
 *
 * On Editor:
 *  If text is empty:
 *      Do not count down session time remaining
 *      Do not count down 5s until deletion
 *  If text not empty:
 *      While session time remaining > 0:
 *          If no typing: count down 5s and delete all
 *          If typing: reset timer to 5s
 *      When session time remaining == 0:
 *          Export buttons pop up
 *          No countdown of session or 5s happening
 */

export default function App() {
    return (
        <BrowserRouter>
            <AppStyled>
                <Route exact path="/" component={Home} />
                <EditorViewWithRouter path="/write" />
            </AppStyled>
        </BrowserRouter>
    );
}
