import { useNavigate } from 'react-router-dom';
import classes from './Button.module.scss';
function Button(props) {
  const navigate = useNavigate();

  return (
    <div className={`ui container` + classes.buttoncontainer}>
      <div className={`ui one column grid  ui buttons ` + classes.buttonback}>
        <button className="ui labeled icon button" onClick={() => navigate('/') /* navigate to root path */}>
          <i className="left chevron icon"></i>
          Back
        </button>
      </div>
    </div>
  );
}
export default Button;
