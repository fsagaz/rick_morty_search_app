import { useState, useEffect, useContext } from 'react';
import NoResults from '../ui/NoResults';
import CharactersSuggestionList from './characters/CharactersSuggestionList';
import classes from './SearchBar.module.scss';
/*Importing our context to update some properties of the state basically the searchTerm*/
import { searchTermContext } from '../store/search-context';

/* constants */
const SEARCH_URI = 'https://rickandmortyapi.com/api/character/';
const SEARCH_PARAM = 'name';
const numberCharactersTriggerSearch = 3;

const SearchBar = (props) => {
  const [isLoading, setIsLoading] = useState(false); // used for showing the spinnig loader indicator
  const [searchTerm, setsearchTerm] = useContext(searchTermContext);
  const [input, setInput] = useState(
    searchTerm !== '' ? searchTerm : ''
  ); /* if we get some value from the searchterm propety of our context we fill in his value on the input text this will let the user to get back his last search*/
  const [loadedCharacters, setLoadedCharacters] = useState([]); // used for stored our query result
  const [noresults, setNoResults] = useState(false); // used for showing the no results message
  const [showSuggestions, setShowSuggestions] = useState(false); // used for showing suggestions

  useEffect(() => { // we trigger the search only if search term is not empty
    if(searchTerm !== '')
    handleSearch(searchTerm); 
  });

  const fetchData = (userInput) => {
    fetch(`${SEARCH_URI}?${SEARCH_PARAM}=${userInput}`)
      .then((response) => response.json())
      .then((data) => {
        let characters = [];
        const items = data.results;
        if (data.results) {
          const itemsFiltered = items.filter(
            (suggestion) =>
              suggestion.name.toLowerCase().indexOf(userInput) > -1
          );
          setNoResults(false);
          characters = itemsFiltered.map((item) => ({
            // setting up our characters array of objects from items filtered
            id: item.id,
            name: item.name,
            species: item.species,
            gender: item.gender,
            image: item.image,
          }));
          setLoadedCharacters(characters);
          setShowSuggestions(true);
          saveQueriesLocalStorage(userInput, characters); // we save to the localStorage our query result to avoid repeating requests to the api
        } else {
          setShowSuggestions(false);
          setNoResults(true); // in case of not getting results we set this boolean to true
          setIsLoading(false);
        }
      });
  };

  const saveQueriesLocalStorage = (userInput, characters) => {
    localStorage.setItem(userInput, JSON.stringify(characters));
    setIsLoading(false);
  };

  const triggerSearch = (event) => { // passing search term from the input to the method that triggers the search
    let userInputTerm = event.target.value;
    setInput(userInputTerm);
    setShowSuggestions(false);
    if (userInputTerm.length > numberCharactersTriggerSearch) {
      setsearchTerm(userInputTerm); // recording on our context the search term
      handleSearch(userInputTerm);
    }
  };

  const handleSearch = (inputTerm) => { // search the name via api query or via localstorage
    let userInput = inputTerm.toLowerCase();
    
    if (localStorage.length>75){ // clean up local storage after having more than 75 entries
      localStorage.clear();
    }

    if (userInput in localStorage) {
      setLoadedCharacters(JSON.parse(localStorage.getItem(userInput)));
      setShowSuggestions(true);
      setIsLoading(false);
    } else {
      fetchData(userInput);
    }
  };

  return (
    <div className="ui container">
      <div className="ui one column grid">
        <div
          className={
            classes.searchbar + ` ui icon input ${isLoading ? 'loading' : ''}`
          }
        >
          <input
            type="text"
            onChange={triggerSearch}
            value={input}
            placeholder="Search..."
          />
          <i className={`search icon ` + classes.iconcustom}></i>
        </div>
      </div>
      {showSuggestions && input && (
        <div className={classes.suggestionscontainer + ` ui one column grid`}>
          <CharactersSuggestionList characters={loadedCharacters} />
        </div>
      )}
      {noresults && input.length > numberCharactersTriggerSearch && (
        <NoResults />
      )}
    </div>
  );
};
export default SearchBar;
