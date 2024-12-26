// src/services/axios.config.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

import api from './axios.config';

export const AuthService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/api/login', { username, password });
      localStorage.setItem('jwt', response.data.token);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.status === 401 ? 'Invalid credentials' :
                     error.response?.status === 404 ? 'User not found' :
                     'Server error';
      return { success: false, error: message };
    }
  },

  logout: async () => {
    try {
      await api.post('/api/logout');
      localStorage.removeItem('jwt');
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  }
};

// src/services/ProjectService.js
import api from './axios.config';

export const ProjectService = {
  getAllProjects: async () => {
    try {
      const response = await api.get('/api/projects');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch projects' };
    }
  },

  getProjectById: async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.status === 404 ? 'Project not found' : 'Server error';
      return { success: false, error: message };
    }
  },

  createProject: async (projectData, images) => {
    try {
      const formData = new FormData();
      formData.append('title', projectData.title);
      formData.append('description', projectData.description);
      formData.append('githublink', projectData.githublink);
      
      images.forEach((image, index) => {
        if (index < 5) { 
          formData.append('images', image);
        }
      });

      const response = await api.post('/api/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.status === 400 ? 'Missing required fields' : 'Server error';
      return { success: false, error: message };
    }
  },

  updateProject: async (id, projectData, images) => {
    try {
      const formData = new FormData();
      
      if (projectData.title) formData.append('title', projectData.title);
      if (projectData.description) formData.append('description', projectData.description);
      if (projectData.githublink) formData.append('githublink', projectData.githublink);
      
      if (images) {
        images.forEach((image, index) => {
          if (index < 5) {
            formData.append('images', image);
          }
        });
      }

      const response = await api.patch(`/api/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      const message = error.response?.status === 404 ? 'Project not found' : 'Server error';
      return { success: false, error: message };
    }
  },

  deleteProject: async (id) => {
    try {
      await api.delete(`/api/projects/${id}`);
      return { success: true };
    } catch (error) {
      const message = error.response?.status === 404 ? 'Project not found' : 'Server error';
      return { success: false, error: message };
    }
  }
};