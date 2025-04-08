import { useState, useEffect, useRef } from 'react';

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
  const [notification, setNotification] = useState('');
  const socketRef = useRef(null);

  // 👇 Setup WebSocket connection
  useEffect(() => {
    // Adjust the URL to match your deployment if needed
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socketUrl = `${protocol}://${window.location.hostname}:4000`;
    console.log('🔌 Connecting to WebSocket at:', socketUrl);
    socketRef.current = new WebSocket(socketUrl);

    
    socketRef.current.onmessage = async (event) => {
      console.log(event)
      const message = JSON.parse(await event.data.text());
      if (message.type === 'survey-submitted') {
        setNotification(`🔔 ${message.username} just submitted their survey!`);
      }
    };

    socketRef.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 5000);
  
      return () => clearTimeout(timer);
    }
  }, [notification]);
  

  // Fetch existing surveys
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('/api/surveys', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) throw new Error('Failed to fetch surveys');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setErrorMessage('Could not load survey data.');
      }
    };

    fetchSurveys();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Failed to submit survey');
      }

      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data.survey]);

      // 🚀 Broadcast message to other users
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        console.log('📤 Sending survey-submitted message to WebSocket clients');
        socketRef.current.send(JSON.stringify({
          type: 'survey-submitted',
          username: formData.username || 'Someone'
        }));
      }

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

  return { formData, handleChange, handleSubmit, errorMessage, users, notification };
};
