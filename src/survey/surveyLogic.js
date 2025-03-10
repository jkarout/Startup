
import { useState, useEffect } from 'react';

export const useSurveyForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    ExerciseFrequency: 'Default',
    Howlong: 'Default',
    Goal: 'Default',
    FavoriteExercise: 'Default',
    FavoriteBigThree: 'Default'
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);

  // 🔥 Fetch survey responses when the component loads
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/surveys', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch surveys');
        }

        const data = await response.json();
        console.log("Fetched survey data:", data); // Debugging

        setUsers(data); // Store users in state
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setErrorMessage('Could not load survey data.');
      }
    };

    fetchSurveys();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || 
        formData.ExerciseFrequency === 'Default' || 
        formData.Howlong === 'Default' || 
        formData.Goal === 'Default' || 
        formData.FavoriteExercise === 'Default' || 
        formData.FavoriteBigThree === 'Default') {
      setErrorMessage('Please fill out all fields before submitting.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/survey', {
        method: 'POST',
        credentials: 'include', // ✅ Sends authentication cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to submit survey');
      }
  
      const data = await response.json();
      console.log('Survey saved:', data);
  
      setUsers((prevUsers) => [...prevUsers, data.survey]);
  
      setFormData({
        username: '',
        ExerciseFrequency: 'Default',
        Howlong: 'Default',
        Goal: 'Default',
        FavoriteExercise: 'Default',
        FavoriteBigThree: 'Default'
      });
  
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting survey:', error);
      setErrorMessage(error.message);
    }
  };
  

  // 🔥 RETURN the necessary values so `Survey.jsx` can use them
  return { formData, handleChange, handleSubmit, errorMessage, users };
};
