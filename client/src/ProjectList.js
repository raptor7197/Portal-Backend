import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:3000/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  const handleDelete = (projectId) => {
    axios.delete(`http://localhost:3000/api/projects/${projectId}`)
      .then(() => {
        fetchProjects(); // Refresh the project list after deletion
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <strong>{project.title}</strong>
            <p>{project.description}</p>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
