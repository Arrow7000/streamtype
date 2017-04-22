import React from 'react';


function Editor(props) {
    const { opacity, text } = props;
    return (<textarea className="editor"></textarea>);
}

export default Editor;