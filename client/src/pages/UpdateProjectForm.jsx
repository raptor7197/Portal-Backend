import axios from '../configuredAxios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

const UpdateProjectForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githublink, setGithublink] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${id}`);
        const project = response.data;
        setTitle(project.title);
        setDescription(project.description);
        setGithublink(project.githublink);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('githublink', githublink);

      // Append each image to the formData under 'images' field
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.patch(`http://localhost:3000/api/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Project updated successfully:', response.data);
      window.location.href = '/admin';
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    // Create image preview URLs
    const imagePreviews = selectedImages.map((image) => URL.createObjectURL(image));
    setImagePreviews(imagePreviews);
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="mt-10 max-w-md mx-auto bg-white rounded-md shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Update Project</h2>
        <label className="block mb-2  text-black">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-4 w-full text-white" />

        <label className="block mb-2  text-black">Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-4 w-full text-white" />

        <label className="block mb-2  text-black">Github Link:</label>
        <input type="text" value={githublink} onChange={(e) => setGithublink(e.target.value)} className="border border-gray-300 rounded-md p-2 mb-4 w-full text-white" />

        <label className="block mb-2  text-black">New Images:</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-4" />

        {/* Display image previews */}
        <div className="flex flex-wrap">
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} className="max-w-xs max-h-xs m-2" />
          ))}
        </div>

        <button type="button" onClick={handleUpdate} className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
          Update Project
        </button>
      </div>
    </>
  );
};

export default UpdateProjectForm;
