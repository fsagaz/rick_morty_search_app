import SearchBar from './SearchBar';
import { useLocation } from 'react-router-dom';
import classes from './Layout.module.scss';
function Layout() {
  const data = useLocation(); 
    return (
    <div className={classes.layout}>
      <div className={classes.image_header}></div>
      <h1 className="ui center aligned header">Rick and Morty search app</h1>
      {/* if we receive props while coming from  the item detail button we pass it again to the searchbar for inform the user his last search/visit*/}
      <SearchBar charactername={data.state !== null ? data.state.name : ''} />
    </div>
  );
}

export default Layout;
