import React from "react";

function Giphys({ giphys, currentWord }) {
  return (
    <>
      {/* { giphys ? (
        <h5 className='section-title'>Giphys on {currentWord}!</h5>
      ):(
        <h5 className='section-title'>Sorry! No giphys found for {currentWord}</h5>
      )} */}
      
      <div>
        { giphys.length === 0 ? (
          <p>No giphys found for {currentWord}</p>
          ) : null
        }
        {giphys.map((eachGiphy, i) => {
              return (
                <img
                  style={{
                    width: "100%",
                    // height: "20rem",
                    height: "34vh",
                    objectFit: "cover",
                  }}
                  src={eachGiphy.images["480w_still"].url}
                  alt=""
                  key={i}
                ></img>
              );
        })}
      </div>
    </>
  );
}

export default Giphys;
