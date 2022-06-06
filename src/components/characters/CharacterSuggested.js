import { Link } from "react-router-dom";
import classes from './CharacterSuggested.module.scss';
function CharacterSuggested(props) {
    const { id, name, species, image, gender } = props.character;
    return (
      
      <Link to={"/character/"+id} state={props.character}> {/* we pass the entire character object as props to the itemDetail  */}
        <div key={id} className={`item `+ classes.itemcontainer}>
        <img className="ui avatar image" src={image} alt={name} />
        <div className="content">
        <div className={`description `+ classes.description_character}><b>{name} </b>- {species} - {gender}</div>
        </div>
        </div>
      </Link>
    );
  }
  
  export default CharacterSuggested;

  