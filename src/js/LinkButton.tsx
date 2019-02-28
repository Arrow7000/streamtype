import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

const LinkButton = ({
    history,
    to,
    staticContext, // throws an error if passed to button as part of ...rest
    ...rest
}: RouteComponentProps & { to: string }) => {
    return <button {...rest} onClick={() => history.push(to)} />;
};

export default withRouter(LinkButton);
