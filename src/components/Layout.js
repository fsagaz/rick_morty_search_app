import SearchBar from './SearchBar';
import classes from './Layout.module.scss';
function Layout() { 
    return (
    <div className={classes.layout}>
      <div className={classes.image_header}></div>
      <h1 className="ui center aligned header">Rick and Morty search app</h1>
      <SearchBar/>
    </div>
  );
}

export default Layout;
