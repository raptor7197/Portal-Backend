import React, { useState } from 'react';
import axios from '../configuredAxios';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

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
    // Assuming you want to handle multiple file uploads
    setImages([...e.target.files]);
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Images:</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
