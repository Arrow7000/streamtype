import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

const LinkButton = ({
    history,
    to,
    warn,
    warnMessage,
    title,
    staticContext, // throws an error if passed to button as part of ...rest
    match, // not needed in <a/> element
    location, // not needed in <a/> element
    ...rest // needed for passing className
}: RouteComponentProps & {
    to: string;
    warn?: boolean;
    warnMessage?: string;
    title?: string;
}) => {
    return (
        <a
            {...rest}
            title={title}
            href={to}
            onClick={e => {
                e.preventDefault();

                const goToLink = () => history.push(to);

                if (warn && warnMessage) {
                    const proceed = confirm(warnMessage);
                    if (proceed) {
                        goToLink();
                    }
                } else {
                    goToLink();
                }
            }}
        />
    );
};

export default withRouter(LinkButton);
