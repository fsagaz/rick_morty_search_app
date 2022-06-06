import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterItem from './components/characters/CharacterItem';
import Layout from './components/Layout';
function App() {
  return (
    <Router>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<Layout />} /> {/* main component is Layout */}
        <Route path="/character/:id" element={<CharacterItem />} /> {/* routing to the character item detail */}
      </Routes>
    </Router>
  );
}

export default App;
