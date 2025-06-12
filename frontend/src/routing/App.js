import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import
import FeedbackForm from '../components/FeedbackForm';
import Appreciate from '../components/Appreciate';

function App() {
  return (
    <Router>
      <Routes>
        {/* feedback form */}
        <Route path="/" element={<FeedbackForm />} />
        
        {/* appreciate  submit */}
        <Route path="/appreciate" element={<Appreciate />} />
      </Routes>
    </Router>
  );
}

export default App;