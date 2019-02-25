import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Editor from "./Editor";
import useEditor from "./useEditor";

function Home() {
    return (
        <>
            <h1>Home</h1>
            <Link to="/write">
                <button>Go to editor</button>
            </Link>
        </>
    );
}

export default function App() {
    const msUntilDeletion = 5000;

    const editorProps = useEditor(msUntilDeletion);

    return (
        <BrowserRouter>
            <>
                <Route exact path="/" component={Home} />
                <Route
                    path="/write"
                    render={() => <Editor {...editorProps} />}
                />
            </>
        </BrowserRouter>
    );
}
