import React from "react";

function Synonyms({ synonyms }) {
  return (
    <>
      <div>
        <ul className="nav nav-tabs" id="synonymTabs" role="tablist">
          {synonyms.map((eachSynonym, i) => {
            return (
              <li className="nav-item" key={i}>
                <a
                  className="nav-link"
                  id={i}
                  data-toggle="tab"
                  href={"#" + i}
                  role="tab"
                  aria-selected="false"
                >
                  {eachSynonym.partOfSpeech + "; " + eachSynonym.synonyms[0]}
                </a>
              </li>
            );
          })}
        </ul>

        {synonyms.map((eachSynonym, i) => {
          return (
            <div className="tab-content" id={i + "tabContent"} key={i}>
              <div
                className="tab-pane fade show active"
                id={i + "TabPane"}
                role="tabpanel"
              >
                <table
                  className="table table-striped table-bordered table-hover table-sm"
                  id={i + "Table"}
                >
                  <tbody id="0TableBody">
                    <tr id="tr0">
                      {eachSynonym.synonyms.map((eachSyn, i) => {
                        return <td key={i}>{eachSyn}</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
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
