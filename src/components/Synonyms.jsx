import React, {useState} from "react";

function Synonyms({ synonyms, currentWord }) {
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <>  
        <h5 className="section-title">Try another word for {currentWord}!</h5>
        <ul className="nav nav-tabs" id="synonymTabs" role="tablist">
          {synonyms.map((eachSynonym, i) => {
            return (
              <li className="nav-item" key={i}>
                <a
                  className={`nav-link syn-meaning ${ tabSelected === i ? "active": ""}`}
                  id={i}
                  data-toggle="tab"
                  // href={"#" + i}
                  role="tab"
                  aria-selected="false"
                  onClick={() => setTabSelected(i)}
                >
                  {eachSynonym.partOfSpeech + "; " + eachSynonym.synonyms[0]}
                </a>
              </li>
            );
          })}
        </ul>
        
        <div className="tab-content" id={"tabContent"} >

        {synonyms.map((eachSynonym, i) => {
          return (
              <div
                className={`tab-pane fade show ${tabSelected === i ? "active": ""}`}
                id={i + "TabPane"}
                role="tabpanel"
                key={i}
              >
              
                <div className='row synonyms'>
                {eachSynonym.synonyms.map((eachSyn, i) => {
                        return <div className='col-sm-2 each-synonym' key={i}>{eachSyn}</div>;
                      })}
                </div>
              </div>
          );
        })}
        </div>
    </>
  );
}

// 0:
// antonyms: (11)["coarse", "dirty", "filthy", "immodest", "impure", "indecent", "obscene", "smutty", "unchaste", "unclean", "vulgar"]
// partOfSpeech: "adjective"
// shortDefinition: "free from any trace of the coarse or indecent"
// synonyms: (9)["chaste", "clean", "decent", "immaculate", "modest", "pure", "vestal", "virgin", "virginal"]
// __proto__: Object
// 1:
// antonyms: undefined
// partOfSpeech: "noun"
// shortDefinition: "as in fed, plainclothesman"
// synonyms: (21)["fed", "Federal", "narc", "plainclothesman", "shadow", "tail", "tracer", "tracker", "detective", "dick", "gumshoe", "hawkshaw", "investigator", "operative", "private detective", "private eye", "private investigator", "shamus", "sherlock", "sleuth", "sleuthhound"]
// __proto__: Object

export default Synonyms;
