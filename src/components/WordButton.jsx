import React from "react";


function WordButton(props) {
  return <button onClick={props.onWordClick}>{props.children}</button>;
}

export default WordButton;
