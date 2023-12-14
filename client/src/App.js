import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/protectedRoute';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForms';
import UpdateProjectForm from './pages/UpdateProjectForm';
import Home from './pages/homePage';
import Login from './pages/login';

const App = () => {
  useEffect(() => {
    let idleTimer;
    const IDLE_TIMEOUT = 1 * 60 * 1000; // 5 minutes in milliseconds

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        localStorage.removeItem('token');
      }, IDLE_TIMEOUT);
    };

    const startIdleTimer = () => {
      resetIdleTimer();
      document.addEventListener('mousemove', resetIdleTimer);
      document.addEventListener('keypress', resetIdleTimer);
    };

    // Start the idle timer when the application loads
    startIdleTimer();

    return () => {
      document.removeEventListener('mousemove', resetIdleTimer);
      document.removeEventListener('keypress', resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<ProtectedRoute />}>
          <Route element={<ProjectList />} path="/admin" />
          <Route element={<ProjectForm />} path="/add" />
          <Route element={<UpdateProjectForm />} path="/projects/:id" />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
