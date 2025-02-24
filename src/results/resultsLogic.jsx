// src/results/ResultsLogic.js
import { useNavigate } from 'react-router-dom';

// ✅ Custom hook to manage exercise navigation
export const useResultsLogic = () => {
  const navigate = useNavigate();

  const handleExerciseChange = (event) => {
    const selectedExercise = event.target.value;
    if (selectedExercise) {
      navigate(selectedExercise); // ✅ Navigate to the selected exercise route
    }
  };

  return { handleExerciseChange };
};
