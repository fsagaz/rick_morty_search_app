import CharacterSuggested from './CharacterSuggested.js';
import classes from './CharacterSuggestionList.module.scss';
function CharactersSuggestionList(props) {
  return (
    <div className={`ui list ` + classes.listcharacters}>
      {props.characters.map((character) => (
        <CharacterSuggested character={character} key={character.id} />
      ))}
    </div>
  );
}

export default CharactersSuggestionList;
