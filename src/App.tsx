import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/notfound" element={<NotFoundPage/>} />
        </Routes>
  );
}

export default App;
