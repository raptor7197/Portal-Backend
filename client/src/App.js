import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForms'
const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<ProjectList />} />
        <Route path="/add" element={<ProjectForm />} />
      </Routes>
    </Router>
  );
};

export default App;
