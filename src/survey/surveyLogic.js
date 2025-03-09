
import { useState } from 'react';

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

  
  const [users, setUsers] = useState([
    { username: 'Jarir Karout', Goal: 'Build Muscle', FavoriteExercise: 'Weightlifting' },
    { username: 'Alex Johnson', Goal: 'Lose Weight', FavoriteExercise: 'Cardio' },
    { username: 'Sarah Lee', Goal: 'Improve Endurance', FavoriteExercise: 'Crossfit' }
  ]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

 
  const handleSubmit = (e) => {
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

    setErrorMessage('');

    
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        username: formData.username,
        Goal: formData.Goal,
        FavoriteExercise: formData.FavoriteExercise
      }
    ]);

    
    setFormData({
      username: '',
      ExerciseFrequency: 'Default',
      Howlong: 'Default',
      Goal: 'Default',
      FavoriteExercise: 'Default',
      FavoriteBigThree: 'Default'
    });

    alert('Form submitted successfully!');
  };

  return { formData, handleChange, handleSubmit, errorMessage, users };
};
