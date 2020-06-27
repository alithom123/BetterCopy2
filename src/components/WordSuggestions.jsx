import React, {useState} from "react";

function WordSuggestions({ wordSuggestions, currentWord }) {

  return (
    <>  
      {/* <h5>Word Suggestions</h5> */}
      <h5 className="section-title">Is {currentWord} a word? Do you mean ...</h5>
      <p>{wordSuggestions.join(" ")}</p>
    </>
  );
}

export default WordSuggestions;
