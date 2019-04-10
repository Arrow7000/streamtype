import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

const LinkButton = ({
    history,
    to,
    staticContext, // throws an error if passed to button as part of ...rest
    ...rest // needed for passing className
}: RouteComponentProps & { to: string }) => {
    return (
        <a
            href={to}
            {...rest}
            onClick={e => {
                e.preventDefault();
                history.push(to);
            }}
        />
    );
};

export default withRouter(LinkButton);
