import React from "react";
import styled, { css } from "styled-components";
import { transparentize, darken } from "polished";

import useEditor, { EditorProps } from "./useEditor";
import * as theme from "./Theme";
import LinkButton from "./LinkButton";
import downloadFile from "./downloadFile";

interface TextAreaProps {
    textOpacity: number;
    isInView: boolean;
    sessionOngoing: boolean;
}

// Constants
const editorPadding = 15; // for mobile
const editorWidth = 500; // for desktop
const bottomButtonRowHeight = 50;

const StyledEditor = styled.div`
    display: grid;
    grid-template-columns: [main-col] 1fr;
    grid-template-rows: [timer-row] ${bottomButtonRowHeight}px [main-row] 1fr [button-row-split] ${bottomButtonRowHeight}px [button-menu];
    height: 100vh;
`;

const centerColPadding = `0 calc(50% - ${editorWidth / 2 - editorPadding}px);`;

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
    grid-row: ${({ sessionOngoing }) =>
        !sessionOngoing ? "main-row" : "main-row / button-menu"};
    grid-column: main-col;
    z-index: 0;
    caret-color: ${theme.caret};
    background-color: ${theme.bg};
    padding: 0 ${editorPadding}px;

    font-size: 1.2rem;
    line-height: 1.5;
    font-family: "Courier Prime Sans";
    @media screen and (min-width: ${editorWidth}px) {
        padding: ${centerColPadding};
    }
`;

const TopBar = styled.div`
    grid-row: timer-row / main-row;
    grid-column: main-col;
    background-color: ${theme.bg};
    color: ${theme.headerText};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 ${editorPadding}px;
    @media screen and (min-width: ${editorWidth}px) {
        padding: ${centerColPadding};
    }
`;

const BackButton = styled(LinkButton)`
    background-color: ${theme.bg};
    color: ${theme.headerText};
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    text-decoration: none;
`;

const ExportMenu = styled.div`
    grid-area: button-row-split / main-col / button-menu;
    background-color: ${theme.buttonBg};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (min-width: ${editorWidth}px) {
        padding: ${centerColPadding};
    }
`;
const MenuButton = styled.button`
    border: none;
    background-color: ${theme.buttonBg};
    color: ${theme.buttonPrimary};
    cursor: pointer;
    font-size: 1rem;
    padding: 0.4rem;
    font-weight: 300;
    box-shadow: 0 1px 5px ${transparentize(0.5, "black")};
    text-decoration: none;
    margin: 0 10px;
    &:hover {
        background-color: ${darken(0.01, theme.buttonBg)};
    }
    &:active {
        background-color: ${darken(0.02, theme.buttonBg)};
    }
`;

interface EditorComponentProps extends EditorProps {
    sessionLengthRemaining: number;
}

export function Editor({
    text,
    changeText,
    sessionLengthRemaining,
    timeLeftUntilDelete,
    totalTimeUntilDeletion
}: EditorComponentProps) {
    const sessionOngoing = sessionLengthRemaining > 0;

    const opacity = sessionOngoing
        ? timeLeftUntilDelete / totalTimeUntilDeletion
        : 1;

    const sessLenAllSeconds = Math.ceil(sessionLengthRemaining / 1000);

    const sessLenMins = Math.floor(sessLenAllSeconds / 60);
    const sessLenSecs = "" + (sessLenAllSeconds - sessLenMins * 60);

    const timerText = `${sessLenMins}m ${sessLenSecs.padStart(2, "0")}s`;

    return (
        <StyledEditor>
            <TopBar>
                <BackButton
                    to="/"
                    warn={text !== ""}
                    warnMessage={
                        "Navigating back to the home screen will lose your progress.\r\n\r\nDo you want to proceed?"
                    }
                    title="Go back to home"
                >
                    ⬅
                </BackButton>
                <div>{sessionOngoing ? timerText : "Session ✅"}</div>
            </TopBar>
            <StyledTextarea
                spellCheck={false}
                placeholder="Start typing..."
                onChange={e => changeText(e.target.value)}
                value={text}
                textOpacity={opacity}
                isInView={true}
                sessionOngoing={sessionOngoing}
            />
            {!sessionOngoing && (
                <ExportMenu>
                    <MenuButton
                        onClick={() => downloadFile("stream.txt", text)}
                    >
                        Export as .txt
                    </MenuButton>
                    <MenuButton onClick={() => downloadFile("stream.md", text)}>
                        Export as .md
                    </MenuButton>
                </ExportMenu>
            )}
        </StyledEditor>
    );
}

interface ConnectedEditorProps {
    totalTimeUntilDeletion: number;
    sessionLength: number;
}

export default function ConnectedEditor({
    totalTimeUntilDeletion,
    sessionLength
}: ConnectedEditorProps) {
    const editor = useEditor(sessionLength, totalTimeUntilDeletion);
    return <Editor {...editor} />;
}
