import { useState, useEffect } from 'react';
import NoResults from '../ui/NoResults';
import CharactersSuggestionList from './characters/CharactersSuggestionList';
import classes from './SearchBar.module.scss';

/* constants */
const SEARCH_URI = 'https://rickandmortyapi.com/api/character/';
const SEARCH_PARAM = 'name';
const numberCharactersTriggerSearch = 3;

const SearchBar = (props) => {
  const [isLoading, setIsLoading] = useState(false); // used for showing the spinnig loader indicator
  const [input, setInput] = useState(
    props.charactername !== '' ? props.charactername : ''
  ); /* if props charactername is received with a value we setup the input field with this value while comming back from item detail */
  const [loadedCharacters, setLoadedCharacters] = useState([]); // used for stored our querye result
  const [noresults, setNoResults] = useState(false); // used for showing the no results message
  const [showSuggestions, setShowSuggestions] = useState(false); // used for showing suggestions

  useEffect(() => { 
    if (input) { // triggering fetchData on useEffect if input text is set with a value: in case we come back from the item detail
      fetchData(input.toLowerCase().split());
    }
  }, []);

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
          characters = itemsFiltered.map((item) => ({ // setting up our characters array of objects from items filtered
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
          setNoResults(true);// in case of not getting results we set this boolean to true
          setIsLoading(false);
        }
      });
  };

  const saveQueriesLocalStorage = (userInput, characters) => {
    localStorage.setItem(userInput, JSON.stringify(characters));
    setIsLoading(false);
  };

  const handleSearch = (event) => {
    let userInput = event.target.value;
    setInput(userInput);
    setShowSuggestions(false);
    if (userInput.length > numberCharactersTriggerSearch) {
      userInput = userInput.toLowerCase();
      
      if (userInput in localStorage) {
        setLoadedCharacters(JSON.parse(localStorage.getItem(userInput)));
        setShowSuggestions(true);
        setIsLoading(false);
      } else {
        fetchData(userInput);
      }
    }
  };

  return (
   <div className="ui container">
      <div className="ui one column grid">
        <div className={classes.searchbar + ` ui icon input ${isLoading ? 'loading' : ''}`}>
          <input
            type="text"
            onChange={handleSearch}
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
