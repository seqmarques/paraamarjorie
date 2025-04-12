import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Letter from './pages/Letter';
import Proposal from './pages/Proposal';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carta" element={<Letter />} />
          <Route path="/pedido" element={<Proposal />} />
        </Routes>
        <MusicPlayer />
      </div>
    </Router>
  );
}

export default App;