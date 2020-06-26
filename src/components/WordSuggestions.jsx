import React, {useState} from "react";

function WordSuggestions({ wordSuggestions }) {

  return (
    <>  
      <h5>Word Suggestions</h5>
      <p>{wordSuggestions.join(" ")}</p>
    </>
  );
}

export default WordSuggestions;
