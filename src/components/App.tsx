import React from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  RouteComponentProps,
  Redirect
} from "react-router-dom";
import styled from "styled-components";

import Editor from "./Editor";
import { Home } from "./Home";
import { FAQs } from "./FAQs";
import { timeParam } from "./config";

interface CustomRouteComponentProps {
  path: string;
}

const EditorView = ({
  location,
  path
}: RouteComponentProps & CustomRouteComponentProps) => {
  const isWriteRoute = location.pathname === path;

  const msUntilDeletion = 5000; // change before committing
  const duration = new URLSearchParams(location.search).get(timeParam);

  if (!isWriteRoute) {
    return null;
  }

  if (!duration) {
    return <Redirect to="/" />;
  }

  return (
    <Editor
      totalTimeUntilDeletion={msUntilDeletion}
      sessionLength={+duration / 60}
    />
  );
};

const EditorViewWithRouter = withRouter(EditorView);

const AppStyled = styled.div`
  min-height: 100vh;
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
  return (
    <Router>
      <AppStyled>
        <Route exact path="/" component={Home} />
        <Route path="/faqs" component={FAQs} />
        <EditorViewWithRouter path="/write" />
      </AppStyled>
    </Router>
  );
}
