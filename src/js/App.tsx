import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    withRouter,
    RouteComponentProps
} from "react-router-dom";
import styled from "styled-components";

import Editor from "./Editor";
import { Home } from "./Home";

interface CustomRouteComponentProps {
    path: string;
}

interface AppEditorProps {
    sessionLength: number;
}

const EditorView = ({
    location,
    path,
    sessionLength
}: RouteComponentProps & CustomRouteComponentProps & AppEditorProps) => {
    const isWriteRoute = location.pathname === path;

    const msUntilDeletion = 5000; // change before committing

    if (!isWriteRoute) {
        return null;
    }

    return (
        <Editor
            totalTimeUntilDeletion={msUntilDeletion}
            sessionLength={sessionLength}
        />
    );
};

const EditorViewWithRouter = withRouter(EditorView);

const AppStyled = styled.div`
    height: 100vh;
`;

/**
 * # App states
 *
 * First version
 *
 * On Homepage:
 *  Timer is not counting down
 *
 * On Editor:
 *  If text is empty:
 *      Do not count down session time remaining
 *      Do not count down 5s to deletion
 *  If text not empty:
 *      While session time remaining > 0:
 *          If no typing: count down 5s and delete all
 *          If typing: reset timer to 5s
 *      When session time remaining == 0:
 *          Export buttons pop up
 *          No countdown of session or 5s happening
 */

export default function App() {
    const defaultSessionLen = 5;
    const [sessionLen, setSessionLen] = useState(defaultSessionLen);

    return (
        <Router>
            <AppStyled>
                <Route
                    exact
                    path="/"
                    component={() => <Home setSessionLength={setSessionLen} />}
                />
                <EditorViewWithRouter
                    path="/write"
                    sessionLength={sessionLen}
                />
            </AppStyled>
        </Router>
    );
}
