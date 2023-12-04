import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import {ProtectedRoute}  from './components/protectedRoute';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForms'
import UpdateProjectForm from './pages/UpdateProjectForm';
import Home from './pages/homePage';
import Login from './pages/login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/"/>
        <Route element={<Login />} path="/login"/>
        <Route element={<ProtectedRoute />}>
          <Route element={<ProjectList />} path="/admin"/>
          <Route element={<ProjectForm />} path="/add"/>
          <Route element={<UpdateProjectForm />} path="/projects/:id"/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
