import React from "react";

/* 
data:
next: "https://api.paperquotes.com/apiv1/quotes/?curated=1&limit=5&offset=5&tags=love%2Clife"
previous: null
results: Array(5)
0:
author: "Sunday Adelaja"
image: null
language: "en"
likes: 0
pk: 29614
quote: "Negative thoughts about ourselves steal our energy."
tags: Array(9)
0: "thoughts"
1: "energy"
2: "calling"
3: "goal"
4: "purpose"
5: "steals"
6: "life"
7: "negative"
8: "mission" 
*/

function Quotes({ quotes, currentWord }) {
  return (
    <>
      { quotes.results.length ? (
        <h5 className='section-title'>Quotes on {currentWord}!</h5>
      ):(
        <h5 className='section-title'>Sorry! No quotes found for {currentWord}</h5>
      )}
      
      <div>
        {/* If you want to see the full data uncomment the line below. */}
        {/* <p>{JSON.stringify(quotes)}</p> */}
        { quotes.length === 0 ? (
          <p>No quotes found for {currentWord}</p>
          ) : null
        }
        {quotes.results.map((eachQuote, i) => {
          return (
            <div className="quote-list-div" key={i}>
              {/* <p className="blockquote">{eachQuote.quote}</p> */}
              <p style={{ marginBottom: "0rem"}}>{eachQuote.quote}</p>
              {/* <p className="blockquote-footer"><cite>{eachQuote.author}</cite></p> */}
              <p className="quote-author">- {eachQuote.author}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Quotes;
