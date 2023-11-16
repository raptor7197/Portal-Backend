import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateProjectForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${id}`);
        const project = response.data;
        setTitle(project.title);
        setDescription(project.description);
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
    // Store all selected files in the images state array
    setImages([...e.target.files]);
  };

  return (
    <div>
      <h2>Update Project</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>New Images:</label>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />

      <button type="button" onClick={handleUpdate}>Update Project</button>
    </div>
  );
};

export default UpdateProjectForm;
