import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/projects', { title, description });
      console.log('Project added successfully:', response.data);

      // Redirect to the homepage
      window.location.href = '/'; // or any other route you want
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
