import axios from '../configuredAxios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleCarousel('next');
    }, 3000); // Change slide every 3 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, [projects]);

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

  const handleCarousel = (direction) => {
    const updatedProjects = projects.map(project => {
      if (direction === 'prev') {
        const lastImage = project.images.pop();
        project.images.unshift(lastImage);
      } else if (direction === 'next') {
        const firstImage = project.images.shift();
        project.images.push(firstImage);
      }
      return project;
    });

    setProjects(updatedProjects);
  };

  return (
    <div>
      <NavBar />
      <div>
        <h1 className='mt-4 mb-2 text-3xl font-bold text-center text-white'> Projects</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {projects.map(project => (
          <div key={project._id} className="max-w-xs mx-2 my-4 bg-white rounded shadow-md overflow-hidden">
            <div className="p-4">
              <strong className="text-xl font-semibold text-black ">{project.title}</strong>
              <div className="pt-4 h-48 overflow-hidden relative">
                <button
                  onClick={() => handleCarousel('prev')}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl text-black bg-transparent rounded-full p-2 z-10"
                >
                  &#8592;
                </button>
                <button
                  onClick={() => handleCarousel('next')}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl text-black bg-transparent rounded-full p-2 z-10"
                >
                  &#8594;
                </button>
                <div className="flex items-center justify-center w-full" style={{ transform: `translateX(-${project.imageIndex * 100}%)` }}>
                  <img
                    src={`data:image/jpeg;base64,${project.images[0]}`}
                    alt={`Pic 0`}
                    className="w-full rounded-lg mb-2"
                  />
                </div>
              </div>
              <p className="text-gray-700 mb-2">{project.description}</p>
              <a href={project.githublink} target="_blank" rel="noopener noreferrer">
                  {project.githublink}
              </a>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                >
                  Delete
                </button>
                <Link to={`/projects/${project._id}`}>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
                  >
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
