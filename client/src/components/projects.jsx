import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
    Aos.init({ duration: 2000 });
  }, []);

  const fetchProjects = () => {
    axios
      .get('http://localhost:3000/api/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  };

  const aosEffects = ['fade-up', 'fade-down', 'fade-left', 'fade-right'];

  const getRandomAosEffect = () => {
    const randomIndex = Math.floor(Math.random() * aosEffects.length);
    return aosEffects[randomIndex];
  };

  const openModal = (index) => {
    document.getElementById(`modal_${index}`).showModal();
  };

  const closeModal = (index) => {
    document.getElementById(`modal_${index}`).close();
  };

  return (
    <div data-theme="cupcake" className="flex flex-wrap gap-20 hero min-h-screen bg-base-200 flex-rows justify-center items-center" id='projects'>
      {projects.map((project, index) => (
        <div key={index} data-aos={getRandomAosEffect()} className="max-w-xs rounded bg-white shadow-blue-900 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 m-3 ">
          <div className="h-full overflow-hidden m-0">
            <div className="carousel carousel-vertical border-blue-950 border-4 h-64 rounded-box" data-autoplay="true">
              {project.images.map((image, imgIndex) => (
                <div key={imgIndex} className="carousel-item h-full">
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`Project ${index}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 text-center border-blue-400 border-4 mt-auto">
            <label
              htmlFor={`modal_${index}`}
              className="text-xl font-semibold mb-2 cursor-pointer text-blue-500 hover:underline"
              onClick={() => openModal(index)}
            >
              {project.title}
            </label>
            <a
              href={project.githublink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-black hover:underline mb-4"
            >
              <FaGithub className="inline align-middle mb-1" />
            </a>
          </div>
          <dialog id={`modal_${index}`} className="modal">
            <div className="modal-box border-blue-900 border-4">
              <h3 className="font-bold text-lg">{project.title}</h3>
              <div className="py-4 overflow-y-auto">
                <p className="whitespace-pre-wrap">
                  {project.description}32
               </p>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={() => closeModal(index)}>
              <button>close</button>
            </form>
          </dialog>
        </div>
      ))}
    </div>
  );
};

export default Projects;
