import { useState } from 'react';
import { bookAPI, userAPI } from './apiClient';

// Custom hook for API calls
export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAPI = async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall;
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      console.error('API Error:', errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, executeAPI };
};

// Custom hook for books
export const useBooks = () => {
  const { loading, error, executeAPI } = useAPI();

  return {
    loading,
    error,
    getBooks: (params) => executeAPI(bookAPI.getAll(params)),
    getBook: (id) => executeAPI(bookAPI.getById(id)),
    addBook: (data) => executeAPI(bookAPI.create(data)),
    updateBook: (id, data) => executeAPI(bookAPI.update(id, data)),
    deleteBook: (id) => executeAPI(bookAPI.delete(id)),
    issueBook: (data) => executeAPI(bookAPI.issue(data)),
    returnBook: (issueId) => executeAPI(bookAPI.return(issueId)),
    getIssuedBooks: () => executeAPI(bookAPI.getIssued()),
  };
};

// Custom hook for users
export const useUsers = () => {
  const { loading, error, executeAPI } = useAPI();

  return {
    loading,
    error,
    register: (data) => executeAPI(userAPI.register(data)),
    login: (data) => executeAPI(userAPI.login(data)),
    getUsers: () => executeAPI(userAPI.getAll()),
    getUser: (id) => executeAPI(userAPI.getById(id)),
    updateUser: (id, data) => executeAPI(userAPI.update(id, data)),
    deleteUser: (id) => executeAPI(userAPI.delete(id)),
  };
};
