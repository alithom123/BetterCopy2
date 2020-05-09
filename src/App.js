import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import WordButton from './components/WordButton'
import Synonyms from './components/Synonyms'
import RelatedImages from './components/RelatedImages'
import Wiki from './components/Wiki'
import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_API_UNSPLASH_ACCESS_KEY });

function App() {

  // const [text, setText] = useState('')
  const [words, setWords] = useState([])
  const [synonyms, setSynonyms] = useState()
  const [relatedImages, setRelatedImages] = useState();
  const [wiki, setWiki] = useState(false);

  const handleWikiClick = (e) => {
    e.preventDefault();

    const wikiOn = true;
    if (wikiOn) {
      //* had to use cors-anywhere to get around cors.
      // axios.get('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&page=obama&prop=text&formatversion=2&format=json')
      axios.get('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=Albert%20Einstein')

        .then((res) => {
          console.log(`res`, res);
          setWiki(res.data);
        })
        .catch(err => {
          console.error(err)
        })
    }


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
        setSynonyms(false);
        console.log(`no synonyms for this word`, synonyms);
      }

      // Now handle images
      getRelatedPhotos(wordsArray[wordsArray.length - 1]);

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

  const getRelatedPhotos = (word) => {

    //* Resource: https://unsplash.com/documentation#search-photos

    // search.photos(keyword, page, per_page, filters)
    // Get a list of photos matching the keyword.

    //   Arguments

    // Argument	Type	Opt / Required	Default
    // keyword	string	Required
    // page	number	Optional
    // per_page	number	Optional	10
    // filters	object	Optional
    // filters.orientation	string	Optional
    // filters.collections	array	Optional
    // Example

    const unsplashOn = false;
    if (unsplashOn) {
      unsplash.search.photos(word, 1, 5, { orientation: "portrait" })
        // .then(toJson)
        .then(res => res.json())
        .then(json => {
          // Your code
          console.log(`here is the results from unsplash`, json);
          setRelatedImages(json);
        });

    }


  }




  return (
    <div className="App">
      {/* <header className="App-header"> */}
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

      {/* <button onClick={handleUnsplashClick}>Get Related Images</button> */}
      <button onClick={handleWikiClick}>Get Wiki Info</button>

      <div className="wiki-section">
        {wiki ? (<Wiki wiki={wiki}></Wiki>) : ""}
      </div>

      <div className="related-images-section">
        <RelatedImages relatedImages={relatedImages}></RelatedImages>
      </div>

      {/*       <div className="mw-parser-output"><div className="redirectMsg"><p>Redirect to:</p><ul className="redirectText"><li><a href="/wiki/Barack_Obama" title="Barack Obama">Barack Obama</a></li></ul></div><table className="box-Redirect_category_shell plainlinks metadata ambox ambox-move" role="presentation" style={{ marginTop: "1.1em", border: "solid 1px darkblue", borderLeftWidth: "0.5em" }}><tbody><tr><td className="mbox-empty-cell"></td><td className="mbox-text" style={{ paddingTop: "0.9em", paddingBottom: "0.9em" }}><div className="mbox-text-span"><img alt="Symbol redirect arrow with gradient.svg" src="//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Symbol_redirect_arrow_with_gradient.svg/25px-Symbol_redirect_arrow_with_gradient.svg.png" decoding="async" width="25" height="15" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/7/71/Symbol_redirect_arrow_with_gradient.svg/38px-Symbol_redirect_arrow_with_gradient.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/7/71/Symbol_redirect_arrow_with_gradient.svg/50px-Symbol_redirect_arrow_with_gradient.svg.png 2x" data-file-width="143" data-file-height="88" /> <b>This page is a <a href="/wiki/Wikipedia:Redirect" title="Wikipedia:Redirect">redirect</a>:</b> <div className="rcat"> <ul><li><b><a href="/wiki/Category:Protected_redirects" title="Category:Protected redirects">Fully protected</a></b>: This is a redirect from a title that is fully protected from editing for any of several possible reasons. It may have been protected by an administrator, or it may be on the <a href="/wiki/Wikipedia:Cascade-protected_items/content" title="Wikipedia:Cascade-protected items/content">Cascade-protected list</a>, or both. <ul><li><b>Please do not replace these redirected links</b> with links directly to the target page unless expressly advised to do so below or elsewhere on this page, or if the change is supported by a policy or guideline.</li></ul></li></ul></div> <div className="rcat"> <ul><li><b><a href="/wiki/Category:Redirects_mentioned_in_hatnotes" title="Category:Redirects mentioned in hatnotes">Mentioned in a hatnote</a></b>: This is a redirect from a title that is mentioned in a <a href="/wiki/Wikipedia:HN" className="mw-redirect" title="Wikipedia:HN">hatnote</a> at the redirect target. The mention is usually atop the <i>target article</i>. It may, however, be directly under a section header, or in another article's hatnote, <em>(whenever the hatnote is under a section, &#123;&#123;<a href="/wiki/Template:R_to_section" title="Template:R to section">R to section</a>&#125;&#125; should also be used)</em>. <ul><li>The titles of redirects mentioned in hatnotes may refer to a subject other than that of the target page. It is possible that this redirect may need to be retargeted, or become an article under its own title, <em>(see &#123;&#123;<a href="/wiki/Template:R_with_possibilities" title="Template:R with possibilities">R with possibilities</a>&#125;&#125;)</em>. If the title is a good candidate for a <a href="https://en.wiktionary.org/wiki/" className="extiw" title="wikt:">Wiktionary</a> link, it may also be added.</li></ul></li></ul></div> <div className="rcat"> <ul><li><b><a href="/wiki/Category:Redirects_from_surnames" title="Category:Redirects from surnames">From a surname</a></b>: This is a redirect from a person's <a href="/wiki/Surname" title="Surname">surname</a>. It is used because Wikipedia has only one article about a person with this surname, or because one individual is the <a href="/wiki/Wikipedia:Disambiguation#Primary_topic" title="Wikipedia:Disambiguation">most likely topic sought by this surname</a> (other persons who share this name might be listed at an <a href="/wiki/Wikipedia:WikiProject_Anthroponymy" title="Wikipedia:WikiProject Anthroponymy">anthroponymy article</a> or at the end of a disambiguation page).</li></ul></div> <div className="rcat"> <ul><li><b><a href="/wiki/Category:Redirects_from_incomplete_names" title="Category:Redirects from incomplete names">From an incomplete name</a></b>: This is a redirect from a title that is an <i>incomplete</i> form of a topic's correct name. The correct name is given by the target of this redirect. <ul><li>Use this rcat to tag redirects from an <i>incomplete</i> form of a name, including a person's, a geographic entity's full name, or a book title. For acceptable <i>short names</i>, please use &#123;&#123;<a href="/wiki/Template:R_from_short_name" title="Template:R from short name">R from short name</a>&#125;&#125; instead. For outright <i>erroneous</i> names, please use &#123;&#123;<a href="/wiki/Template:R_from_incorrect_name" title="Template:R from incorrect name">R from incorrect name</a>&#125;&#125; instead.</li> <li>This redirect is kept to aid <a href="/wiki/H:S" className="mw-redirect" title="H:S">searches</a>. Pages linking to this title should be updated to link directly to the correct title given above, unless the form is an acceptable <i>short name</i> better tagged by &#123;&#123;<a href="/wiki/Template:R_from_short_name" title="Template:R from short name">R from short name</a>&#125;&#125;.</li> <li>This template tags redirects with a subcategory of the <a href="/wiki/Category:Redirects_from_incorrect_names" title="Category:Redirects from incorrect names">Redirects from incorrect names</a> category, so template &#123;&#123;<a href="/wiki/Template:R_from_incorrect_name" title="Template:R from incorrect name">R from incorrect name</a>&#125;&#125; should not be used with this template.</li></ul></li></ul></div> <div className="rcat"> <ul><li><b><a href="/wiki/Category:Printworthy_redirects" title="Category:Printworthy redirects">From a printworthy page title</a></b>: This is a redirect from a title that would be helpful in a <a href="https://meta.wikimedia.org/wiki/Paper_Wikipedia" className="extiw" title="meta:Paper Wikipedia">printed</a> or <a href="/wiki/Wikipedia:1" className="mw-redirect" title="Wikipedia:1">CD/DVD</a> version of Wikipedia. See <a href="/wiki/Wikipedia:Printability" title="Wikipedia:Printability">Wikipedia:Printability</a> for more helpful information.</li></ul></div> <i><small>When appropriate, <a href="/wiki/Wikipedia:Protection_policy" title="Wikipedia:Protection policy">protection levels</a> are automatically sensed, described and categorized.</small></i></div></td></tr></tbody></table>  </div> */}


      {/* </header> */}
    </div>
  );
}

export default App;
