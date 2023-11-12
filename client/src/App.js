import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
<<<<<<< HEAD
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForms'
=======
import ProjectList from './ProjectList';

>>>>>>> master
const App = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<ProjectList />} />
<<<<<<< HEAD
        <Route path="/add" element={<ProjectForm />} />
=======
>>>>>>> master
      </Routes>
    </Router>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> master
