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

interface CustomRouteComponentProps {
    path: string;
}

const EditorView = ({
    location,
    path
}: RouteComponentProps & CustomRouteComponentProps) => {
    // const [currentCharIndex, setCurrentCharIndex] = useState(0);

    const msUntilDeletion = 15000; // change before committing

    const isWriteRoute = location.pathname === path;

    const editorProps = useEditor(msUntilDeletion);
    const { changeText, text } = editorProps;

    const allVerses = bibleVerses.join("\n\n") + "\n\n";

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

    return <Editor {...editorProps} />;
};

const EditorViewWithRouter = withRouter(EditorView);

const AppStyled = styled.div`
    display: grid;
    grid-template-columns: [main-col] 1fr;
    grid-template-rows: [main-row] 100vh;
`;

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
