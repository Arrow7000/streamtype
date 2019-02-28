import React, { CSSProperties } from "react";
import { EditorProps } from "./useEditor";
import styled, { StyledComponent } from "styled-components";

interface TextAreaProps {
    textOpacity: number;
}

const editorPadding = 15;
const editorWidth = 500;

const StyledTextarea = styled.textarea.attrs(
    ({ textOpacity }: TextAreaProps) => ({
        style: { color: `rgba(0,0,0,${textOpacity}` }
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
    caret-color: black;
    padding: ${editorPadding}px;
    @media screen and (min-width: ${editorWidth}px) {
        padding: 50px calc(50% - ${editorWidth / 2 - editorPadding}px);
    }
`;

export default function Editor({
    text,
    changeText,
    timeLeft,
    totalTimeUntilDeletion
}: EditorProps) {
    if (timeLeft === 0) {
        changeText("");
        console.log("All text deleted");
    }

    return (
        <StyledTextarea
            spellCheck={false}
            placeholder="Start typing..."
            onChange={e => changeText(e.target.value)}
            value={text}
            textOpacity={timeLeft / totalTimeUntilDeletion}
        />
    );
}
