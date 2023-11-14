import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);

      const response = await axios.post('http://localhost:3000/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Project added successfully:', response.data);

      window.location.href = '/'; 
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleImageChange = (e) => {
    // Assuming you want to handle a single file upload
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
