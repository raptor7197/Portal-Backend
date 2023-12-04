import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios.get('http://localhost:3000/api/projects')
      .then(response => {
        setProjects(response.data); // Assuming the API returns an array of projects
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <div className="h-96 carousel carousel-vertical rounded-box">
            {project.images.map((image, imgIndex) => (
              <div className="carousel-item h-full" key={imgIndex}>
                <img src={`data:image/jpeg;base64,${image}`} alt={`Pic ${imgIndex}`} className="rounded-box h-40" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
