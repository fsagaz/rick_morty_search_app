import classes from './Card.module.scss';

function Card(props) {
  
  return (
    <div className='ui container'>
      <div className={`ui one column grid ` + classes.carditem}>
        <div className={`ui card ` + classes.carditemdetail}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Card;
