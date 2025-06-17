import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import Appreciate from './components/Appreciate';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<FeedbackForm />} />
              <Route path="/appreciate" element={<Appreciate />} />
            </Routes>
          </div>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;