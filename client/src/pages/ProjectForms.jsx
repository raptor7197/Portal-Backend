import React, { useState } from 'react';
import axios from '../configuredAxios';
import NavBar from '../components/NavBar';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [githublink, setGithublink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one image is selected
    if (images.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('githublink', githublink);

      // Append each image to the formData under 'images' field
      images.forEach((image, index) => {
        formData.append('images', image);
      });

      const response = await axios.post('http://localhost:3000/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Project added successfully:', response.data);

      // Redirect to the project list after successful addition
      window.location.href = '/admin';
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    // Create image preview URLs
    const imagePreviews = selectedImages.map((image) => URL.createObjectURL(image));
    setPreviewImages(imagePreviews);
  };

  // State to hold image preview URLs
  const [previewImages, setPreviewImages] = useState([]);

  return (
    <>
    <NavBar />
    <div className=" mt-10 max-w-md mx-auto bg-white rounded-md shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Add Project</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2 text-black">Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="border border-gray-300 rounded-md p-2 mb-4 w-full text-white" />

        <label className="block mb-2 text-black">Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="border text-white border-gray-300 rounded-md p-2 mb-4 w-full" />

        <label className="block mb-2 text-black">GithubLink:</label>
        <textarea value={githublink} onChange={(e) => setGithublink(e.target.value)} required className="border text-white border-gray-300 rounded-md p-2 mb-4 w-full" />

        <label className="block mb-2 text-black">Images:</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mb-4" />

        <div>
          {previewImages.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
          ))}
        </div>

        <button type="submit" className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
          Add Project
        </button>
      </form>
    </div>
    </>
  );
};

export default ProjectForm;
