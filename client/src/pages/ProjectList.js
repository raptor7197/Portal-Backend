import axios from '../configuredAxios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
        fetchProjects();
      })
      .catch(error => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <div>
      <h2 className='text-3xl font-bold underline'>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <strong>{project.title}</strong>
            <p>{project.description}</p>
            {project.images && (
              <div>
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    className='w-25 h-20'
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`Project: ${project.title} - pic ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={() => handleDelete(project._id)}>Delete</button>
            <Link to={`/projects/${project._id}`}>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/add" className="m-40 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Add Project</Link>
    </div>
  );
};

export default ProjectList;
