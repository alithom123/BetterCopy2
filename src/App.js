import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import WordButton from './components/WordButton'
import Synonyms from './components/Synonyms'

function App() {

  // const [text, setText] = useState('')
  const [words, setWords] = useState([])
  const [synonyms, setSynonyms] = useState()

  function handleWordButtonClicked(e) {
  }

  async function findSynonymsMerriamWebsterDictionaryApi(word) {
    console.log("Running findSynonymsMerriamWebsterDictionaryApi(" + word + ")");

    // let apiCollegiateKey = "329cd6bf-de15-4cdb-803d-4cf1e77c5091"; // TODO: Hide this.
    console.log(`process.env`, process.env);
    const apiCollegiateKey = process.env.REACT_APP_API_COLLEGIATE_KEY;
    console.log(`api key`, apiCollegiateKey);
    let apiCollegiateBaseUrl = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{word}?key={api-key}";
    var apiUrl = apiCollegiateBaseUrl.replace("{word}", word).replace("{api-key}", apiCollegiateKey);
    console.log("Here is the apiUrl: " + apiUrl);

    console.log("url =" + apiUrl);

    try {
      const apiResult = await axios.get(apiUrl);
      console.log(`apiResult.data`, apiResult.data);
      /* 
      /** Let's check if you actually got synonmys. If it's not a real word, it will just give you an array of close words match.

      When I search for "thi" the result set is a plain array where the elemtns are just strings and not objects.

      apiResult.data
         (20)["thaw", "thin", "thew", "chi", "tai", "ethic", "thick", "thief", "thigh", "thing", "think", "thins", "third", "ch'i", "chic", "chid", "chin", "chip", "chis", "chit"]

       apiResult.data
       0:
       def: [{ … }]
       fl: "adjective"
       hwi: { hw: "thin" }
       meta: { id: "thin", uuid: "698ee4bd-b9d7-4d6e-8718-db7239456739", src: "coll_thes", section: "alpha", target: { … }, … }
       shortdef: (3)["having a noticeably small amount of body fat", "being of less than usual width", "not containing very much of some important element"]
       __proto__: Object
       1: { meta: { … }, hwi: { … }, fl: "verb", def: Array(1), shortdef: Array(1) }
       2: { meta: { … }, hwi: { … }, fl: "adjective", def: Array(1), shortdef: Array(1) }
       3: { meta: { … }, hwi: { … }, fl: "adjective", def: Array(1), shortdef: Array(1) }
       4: { meta: { … }, hwi: { … }, fl: "verb", def: Array(1), shortdef: Array(3) }
       */


      if (typeof apiResult.data === "object" && typeof apiResult.data["0"] !== 'object') {
        // If in here then it didn't return results probably because it was not a word. "thi" will return "thin", "thaw", "thew", ...
        console.log(`the word entered did not return synonyms but only word suggestions`);
        // TODO: Offer these word suggestions up somewhere. Good for spellcheck or just get your brain to go somewhere.
        return false;
      } else {
        // console.log(`typeof apiResult.data`, typeof apiResult.data);
        // console.log(`typeof apiResult.data[0]`, typeof apiResult.data[0]);
        const standardizedResult = standardizeSynonyms(apiResult.data);
        console.log(`standardizedResult`, standardizedResult);
        return standardizedResult;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function standardizeSynonyms(queryResult) {
    console.log("Running standardizeSynonyms");
    console.log(queryResult);

    var synonymsArray = [];

    for (var i = 0; i < queryResult.length; i++) {
      var eachResult = queryResult[i];
      var obj = {
        partOfSpeech: null,
        synonyms: null,
        antonyms: null,
        shortDefinition: null
      };

      obj.partOfSpeech = eachResult.fl;
      obj.antonyms = eachResult.meta.ants[0];
      obj.synonyms = eachResult.meta.syns[0];
      obj.shortDefinition = eachResult.shortdef[0];

      synonymsArray.push(obj);

      console.log(queryResult[i]);
      // var synonyms = [];
      // var antonyms = [];
      // var shortDefinition = null;
    }
    return synonymsArray;
  }; // End of function populateSynonyms() {}



  // findSynonymsMerriamWebsterDictionaryApi('doctor', () => {
  //   console.log(`here is the callback`)
  // });


  async function handleTextChange(e) {
    const text = e.target.value;
    console.log(`handleTextChange`, text);
    let wordsArray = text.match(/\b(\w+)\b/g); //* This defines our words. Maybe just detect when this changes.
    //* If number of words has change, redo the synonyms.
    //* Maybe easier to check if the last word has changed? sounds better.

    //* previous statement returns null if no matches... should probably convert to empty array.
    if (wordsArray === null) {
      wordsArray = [];
    }

    console.log(`new words length = ${wordsArray.length} old words = ${words.length}`);
    if (words.length !== wordsArray.length || words[words.length - 1] !== wordsArray[wordsArray.length - 1]) {
      console.log(`New word detected so going out to the api`);
      setWords(wordsArray);
      const synonyms = await findSynonymsMerriamWebsterDictionaryApi(wordsArray[wordsArray.length - 1]); // returns false if not a word.

      if (synonyms) {
        console.log(`i have new synonyms, performing setSynonyms with them`, synonyms);
        setSynonyms(synonyms)
      } else {
        console.log(`no synonyms for this word`, synonyms);
      }
    }
  }


  // TODO: Somehow detect if they just finished a word. If they did, update it with the synonyms.
  //* If last character is a space. Simplest way to do it at this point. Maybe also consider period and comma and apostrophe and semicolon.
  // if ([' ', ',', '.', ';', '\'', '!', "\""].includes(text.charAt(text.length - 1))) {

  // }
  // }
  // TODO: Use something like this from bettercopy.js to parse the text.
  // wordsArray = input.match(/\b(\w+)\b/g);

  // $(wordsArray).each(function (index, value) {

  //   var wordButton = $("<button>")

  //     .addClass("word-button btn btn-primary")
  //     .append("<span>")
  //     .text(value);

  //   $("#buttons").append(wordButton);

  //   wordButton.on("click", function () {
  //     console.log("simple demo of word button click handler.");

  //     var queryResult = findSynonymsMerriamWebsterDictionaryApi(value, populateSynonyms); // returns results or false.

  //   });

  // function populateSynonyms(word, standardizedData) {
  //   console.log("Running populateSynonyms");
  //   console.log(standardizedData);

  //   // Build the tabContent, tabPanes, tables.
  //   // var tabContent = $("<div>").addClass("tab-content").attr("id",index + "TabContent");
  //   var tabContent = $("<div>").addClass("tab-content").attr("id", "tabContent");

  //   var firstTab;
  //   $.each(standardizedData, function (index, value) {
  //     // This loop builds the tables inside each tab.
  //     console.log("in synonyms each.");
  //     console.log("index = ");
  //     console.log(index);
  //     console.log("value = ");
  //     console.log(value);
  //     console.log("What is 'this'?");
  //     console.log(this);

  //     // TODO: Need to somehow set the active tab to the first one.
  //     var tabPane;
  //     if (index === 0) {
  //       tabPane = $("<div>").addClass("tab-pane fade show active").attr("id", index + "TabPane").attr("role", "tabpanel");
  //     } else {
  //       tabPane = $("<div>").addClass("tab-pane fade show").attr("id", index + "TabPane").attr("role", "tabpanel");
  //     }

  //     var table = $("<table>").addClass("table table-striped table-bordered table-hover table-sm").attr("id", index + "Table");

  //     // var table = $("<thead>").addClass("table table-striped table-bordered table-hover table-sm");

  //     var tbody = $("<tbody>").attr("id", index + "TableBody");

  //     var row = 0;
  //     var col = 0;
  //     var tr;
  //     var numSynonyms = value.synonyms.length;
  //     $.each(value.synonyms, function (wordIndex, wordValue) {
  //       console.log("in each word loop = " + wordValue);
  //       console.log("What is 'this' now?");
  //       console.log(this);

  //       if (col === 0) {
  //         tr = $("<tr>").attr("id", "tr" + row);
  //       }

  //       var td = $("<td>").text(wordValue);
  //       tr.append(td);
  //       // tbody.append(tr.append(td));

  //       col = (col + 1) % maxWordsInRow;
  //       // If this word completes the row or is the end of the words, then add row to body.
  //       if (col === 0 || row * maxWordsInRow + col === numSynonyms) {
  //         tbody.append(tr);
  //         row++;
  //       }
  //     });

  //     tabContent.append(tabPane.append(table.append(tbody)));
  //   });
  //   console.log("Heres your tabContent:");
  //   console.log(tabContent);

  //   // Create the tabs.
  //   var tabUnorderedList = $('<ul>').addClass("nav nav-tabs").attr("id", "synonymTabs").attr("role", "tablist");

  //   $.each(standardizedData, function (index, value) {
  //     // This loop builds the tabs.
  //     console.log("in tab each.");
  //     console.log("index = " + index);
  //     console.log(value);
  //     var tabTitle = value.partOfSpeech + "; " + value.synonyms[0];
  //     var tabItem = $('<li>').addClass("nav-item");
  //     var anchorItem = $('<a>').addClass("nav-link")
  //       .attr("id", index)
  //       .attr("data-toggle", "tab")
  //       .attr("href", "#" + index)
  //       .attr("role", "tab")
  //       .text(tabTitle);

  //     if (index === 0) {
  //       anchorItem.addClass("active");
  //     }

  //     anchorItem.on("click", function () {
  //       console.log("Received the tab click");
  //       /* Need to add "active" class to the tabPane you created after this.
  //       Also need to remove active class from any others */

  //       // Remove current tab with active status.
  //       $("div.tab-pane.active").removeClass("active");
  //       // Set active on the tabPane they just selected.
  //       $("#" + index + "TabPane").addClass("active");
  //     });

  //     tabItem.append(anchorItem);
  //     tabUnorderedList.append(tabItem);
  //   });

  //   $("#synonyms").empty();
  //   $("#synonyms").append(tabUnorderedList);
  //   $("#synonyms").append(tabContent);
  //   console.log("tabUnorderedList:"); console.log(tabUnorderedList);

  // }; // End of function populateSynonyms() {}




  return (
    <div className="App">
      <header className="App-header">
        <h1>Start typing!</h1>
        <h2>We'll help inspire you!</h2>
        <textarea onChange={handleTextChange}></textarea>
        <div className="word-buttons-section">
          {
            words.map((word, i) =>
              <WordButton key={i}>{word}</WordButton>
            )
          }
        </div>
        <div className="synonyms-section">
          {synonyms ? (
            <Synonyms synonyms={synonyms}></Synonyms>
          ) : ""}

        </div>
      </header>
    </div>
  );
}

export default App;
