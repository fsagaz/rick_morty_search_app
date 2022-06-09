import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterItem from './components/characters/CharacterItem';
import Layout from './components/Layout';
import SearchTermsProvider from './store/search-context';
function App() {
  return (
    <Router>
      <SearchTermsProvider>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<Layout />} /> {/* main component is Layout */}
        <Route path="/character/:name/" element={<CharacterItem />} /> {/* routing to the character item detail */}
      </Routes>
      </SearchTermsProvider>
    </Router>
    
  );
}

export default App;
