import React from "react";
import styled from "styled-components";
import { lighten, transparentize } from "polished";

import { EditorProps } from "./useEditor";
import * as theme from "./Theme";

interface TextAreaProps {
    textOpacity: number;
}

const editorPadding = 15;
const editorWidth = 500;

const StyledTextarea = styled.textarea.attrs(
    ({ textOpacity }: TextAreaProps) => ({
        style: { color: transparentize(1 - textOpacity, theme.editorText) }
    })
)<TextAreaProps>`
    resize: none;
    outline: none;
    overflow-y: auto;
    font-family: "Operator Mono", "Consolas", sans-serif;
    box-sizing: border-box;
    border: 0;
    grid-row: main-row;
    grid-column: main-col;
    z-index: 0;
    caret-color: ${theme.caret};
    background-color: ${theme.bg};
    padding: ${editorPadding}px;
    font-size: 1.2rem;
    line-height: 1.5;
    font-family: "Courier Prime Sans";
    @media screen and (min-width: ${editorWidth}px) {
        padding: 50px calc(50% - ${editorWidth / 2 - editorPadding}px);
    }
`;

const ExportMenu = styled.div`
    height: 50px;
    width: 100%;
    background-color: ${theme.buttonBg};
    grid-area: main-row / main-col;
    z-index: 2;
    align-self: end;
`;

interface EditorComponentProps extends EditorProps {
    isInView: boolean;
}

export default function Editor({
    text,
    changeText,
    timeLeftUntilDelete,
    timeUntilDeletion,
    isInView
}: EditorComponentProps) {
    return (
        <>
            <StyledTextarea
                spellCheck={false}
                placeholder="Start typing..."
                onChange={e => changeText(e.target.value)}
                value={text}
                textOpacity={timeLeftUntilDelete / timeUntilDeletion}
            />
            {isInView && <ExportMenu />}
        </>
    );
}
