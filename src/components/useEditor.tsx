import { useState } from "react";
import useInterval from "./useInterval";

export enum StateLabel {
  NotStarted,
  InProgress,
  Finished
}

type EditorState =
  | {
      state: StateLabel.NotStarted;
    }
  | {
      state: StateLabel.InProgress;
      timeLeftUntilDelete: number;
      sessionLengthInMsRemaining: number;
    }
  | {
      state: StateLabel.Finished;
    };

export interface EditorProps {
  state: EditorState;
  text: string;
  changeText: (text: string) => void;
}

export default function useEditor(
  sessionLengthInSecs: number,
  totalTimeUntilDeletion: number
): EditorProps {
  const sessionLengthInMs = sessionLengthInSecs * 1000;

  const [text, updateText] = useState("");

  const [state, setState] = useState<EditorState>({
    state: StateLabel.NotStarted
  });

  function changeText(textOrUpdater: ((oldText: string) => string) | string) {
    updateText(textOrUpdater);

    switch (state.state) {
      case StateLabel.NotStarted:
        setState({
          state: StateLabel.InProgress,
          sessionLengthInMsRemaining: sessionLengthInMs,
          timeLeftUntilDelete: totalTimeUntilDeletion
        });
        break;

      case StateLabel.InProgress:
        setState({
          ...state,
          timeLeftUntilDelete: totalTimeUntilDeletion
        });
        break;
    }
  }

  const tickRate = (1000 / 60) * 5; // 12 fps

  useInterval(() => {
    if (state.state === StateLabel.InProgress) {
      setState({
        ...state,
        sessionLengthInMsRemaining: state.sessionLengthInMsRemaining - tickRate,
        timeLeftUntilDelete: state.timeLeftUntilDelete - tickRate
      });
    }
  }, tickRate);

  const sessionCompleted =
    state.state === StateLabel.InProgress &&
    state.sessionLengthInMsRemaining <= 0;

  const sessionExpired =
    state.state === StateLabel.InProgress && state.timeLeftUntilDelete <= 0;

  if (sessionCompleted) {
    setState({ state: StateLabel.Finished });
    console.log("Session finished!");
  } else if (sessionExpired) {
    updateText("");
    setState({ state: StateLabel.NotStarted });
    console.log("All text deleted");
  }

  return {
    text,
    state,
    changeText
  };
}
