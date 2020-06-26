import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import WordButton from './components/WordButton'
import Synonyms from './components/Synonyms'
import RelatedImages from './components/RelatedImages'
import Wiki from './components/Wiki'
import Quotes from './components/Quotes'
import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_API_UNSPLASH_ACCESS_KEY });

function App() {

  // const [text, setText] = useState('')
  const [words, setWords] = useState([])
  const [synonyms, setSynonyms] = useState()
  const [relatedImages, setRelatedImages] = useState();
  const [wiki, setWiki] = useState(false);
  const [quotes, setQuotes] = useState(false);

  /* 
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
   */

  const getSynonyms = async (word) => {

    const synonymsOn = true;
    if (synonymsOn) {
      console.log(`New word detected so going out to the api`);
      const synonyms = await findSynonymsMerriamWebsterDictionaryApi(word); // returns false if not a word.

      if (synonyms) {
        console.log(`i have new synonyms, performing setSynonyms with them`, synonyms);
        setSynonyms(synonyms)
      } else {
        setSynonyms(false);
        console.log(`no synonyms for this word`, synonyms);
      }
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

    setWords(wordsArray);

    console.log(`new words length = ${wordsArray.length} old words = ${words.length}`);
    let currentWord = undefined;
    if (words.length !== wordsArray.length || words[words.length - 1] !== wordsArray[wordsArray.length - 1]) {
      currentWord = wordsArray[wordsArray.length - 1];
      console.log(`New word detected so going out to the api`);


      // Now handle synonyms
      getSynonyms(currentWord)

      // const synonyms = await findSynonymsMerriamWebsterDictionaryApi(currentWord); // returns false if not a word.

      // if (synonyms) {
      //   console.log(`i have new synonyms, performing setSynonyms with them`, synonyms);
      //   setSynonyms(synonyms)
      // } else {
      //   setSynonyms(false);
      //   console.log(`no synonyms for this word`, synonyms);
      // }

      // Now handle images
      getRelatedPhotos(currentWord);

      // Now handle wiki(wordsArray[wordsArray.length - 1])
      getWiki(currentWord);

      // Now handle quotes
      getQuotes(currentWord);

    }
  }


  // TODO: Somehow detect if they just finished a word. If they did, update it with the synonyms.
  //* If last character is a space. Simplest way to do it at this point. Maybe also consider period and comma and apostrophe and semicolon.
  // if ([' ', ',', '.', ';', '\'', '!', "\""].includes(text.charAt(text.length - 1))) {

  // }
  // }
  // TODO: Use something like this from bettercopy.js to parse the text.
  // wordsArray = input.match(/\b(\w+)\b/g);


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

    const unsplashOn = true;
    if (unsplashOn) {
      unsplash.search.photos(word, 1, 9, { orientation: "portrait" })
        // .then(toJson)
        .then(res => res.json())
        .then(json => {
          // Your code
          console.log(`here is the results from unsplash`, json);
          setRelatedImages(json);
        });

    }


  }

  const getWiki = (word) => {

    const wikiOn = true;
    if (wikiOn) {
      //* had to use cors-anywhere to get around cors.
      // axios.get('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&page=obama&prop=text&formatversion=2&format=json')
      axios.get(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&titles=${word}`)

        .then((res) => {
          console.log(`res`, res);
          setWiki(res.data);
        })
        .catch(err => {
          console.error(err)
        })
    }
  }

  const getQuotes = (word) => {
    console.log(`word`, word);

    const quotesOn = true;
    if (quotesOn) {
      // axios.get(`https://api.paperquotes.com/apiv1/quotes/?tags=love,life&curated=1`)
      // axios.get(`https://api.paperquotes.com/apiv1/quotes/?tags=love,life&curated=1`)
      // axios.get(`https://api.paperquotes.com/apiv1/quotes/?tags=love,life&curated=1`)
      //   .then((res) => {
      //     console.log(`res`, res);
      //     setQuotes(res.data);
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })

      // 7f30dc8d8b6f307e78257fde25107b67dd04e297 Make sure you have signed up to PaperQuotes Account.Login to your account here.Navigate to your account section.That's your PaperQuotes API key.
      // The API key needs to be sent with your API request headers as key "Authorization" and value as "Token {your_api_key_here}".
      // axios.get(`https://api.paperquotes.com/apiv1/quotes/?author=Mahatma%20Gandhi`,
      axios.get(`https://api.paperquotes.com/apiv1/quotes/?tags=${word}&curated=1`,
        {
          headers: {
            'Authorization': `Token 7f30dc8d8b6f307e78257fde25107b67dd04e297`
          }
        })
        .then((res) => {
          console.log(`setting quotes to res.data`, res.data);
          setQuotes(res.data);
        })
        .catch(err => {
          //! You get a response like this if your requests get throttled.
          //! Try to do that thing where you wait a few tenths of a second to check if they've changed the string... if the string doesn't change only then do you fire off the requests. This way if they are typing fast, you don't fire a request off with every keystroke, only when they slow down or stop.
          // { detail: "Request was throttled. Expected available in 2837.0 seconds." }
          // detail: "Request was throttled. Expected available in 2837.0 seconds."
          console.error(err)
        })

    }
  }






  return (
    <div className="App">

      {/* Grid container set by this div and classname bc-grid-container */}
      <div className="container bc-grid-container">

        {/* Header area */}
        <div className="bc-header-area">
          {/* Why does this h1 and h2 go on different rows? Code-Mentor??? */}
          <>
            <h1 className="title" style={{ display: "inline" }}>Just start typing!</h1>
            <h2 className="tagline">We'll inspire you!</h2>
          </>
        </div>

        {/* Copy area for writing */}
        <div className="bc-copy-area">
          <>
          <div class="form-group">
            <textarea className="copy-input-textarea form-control" onChange={handleTextChange} defaultValue="Type or paste (⌘+V) your text here."></textarea>
          </div>
          </>
        </div>

        {/* Thesaurus area */}
        <div className="bc-thesaurus-area">

          {/*           
          <div className="word-buttons-section">
            {
              words.map((word, i) =>
                <WordButton key={i}>{word}</WordButton>
              )
            }
          </div>
           */}
        
          <div className="synonyms-section">
            {synonyms ? (
              <Synonyms synonyms={synonyms}></Synonyms>
            ) : ""}
          </div>
        </div>
  
        {/* Wiki area */}
        <div className="bc-wiki-area">
          {/* <button onClick={handleWikiClick}>Get Wiki Info</button> */}
          <div className="wiki-section">
            {wiki ? (<Wiki wiki={wiki}></Wiki>) : ""}
          </div>
        </div>

        {/* Quotes area */}
        <div className="bc-quotes-area">
          <div className="quotes-section">
            {quotes ? (<Quotes quotes={quotes}></Quotes>) : ""}
          </div>
        </div>

        {/* Images area */}
        <div className="bc-images-area">
          {/* <button onClick={handleUnsplashClick}>Get Related Images</button> */}
          <div className="related-images-section">
            {relatedImages ? <RelatedImages relatedImages={relatedImages} /> : ""}
          </div>
        </div>

      </div> {/* End of grid */}

    </div> // End of App

  );
}

export default App;
