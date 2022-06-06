import Card from '../../ui/Card';

import Button from '../../ui/Button';
import { useLocation } from 'react-router-dom';

function CharacterItem(props) {
  const data = useLocation(); // retrieving data (character info) from the props we pass from the request link using this hook from react-router
  const { name, species, image, gender } = data.state;

  return (
    <div>
      <Card>
        <div className="image">
          <img src={image} alt={name} />
        </div>
        <div className="content">
          <div className="header">{name} </div>
          <div className="description">
            <address>{species}</address>
            <p>{gender}</p>
          </div>
        </div>
      </Card>
      <Button charactername={name} /> {/* passing the character name as props to the button */}
    </div>
  );
}

export default CharacterItem;
