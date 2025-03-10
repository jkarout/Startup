import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useSurveyForm } from './surveyLogic';
import styles from './survey.module.css';

export function Survey() {
  const { formData, handleChange, handleSubmit, errorMessage, users } = useSurveyForm();
  const navigate = useNavigate(); 

  return (
    <div className={styles.body}>
      <main>
        <img
          src="https://res.cloudinary.com/teepublic/image/private/s--AXsn4sc_--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1675289574/production/designs/38944431_2.jpg"
          width="400"
          alt="Motivational Quote"
        />

        <section id="notifications">
          <h2>Live Notifications</h2>
          <p id="websocket-message">
            "Another user has just completed their survey! Keep going!"
          </p>
        </section>

        <hr />
        <p>To reach your goals, please answer the following questions!</p>
        <hr />

        <h1>Survey</h1>

        
        <form onSubmit={handleSubmit}>
          <table border="1" cellSpacing="0" cellPadding="10">
            <tbody>
              <tr>
                <td>1. What is your name?</td>
                <td>
                  <input 
                    type="text" 
                    name="username" 
                    placeholder="Name" 
                    value={formData.username} 
                    onChange={handleChange} 
                  />
                </td>
              </tr>

              <tr>
                <td>2. How often do you exercise?</td>
                <td>
                  <select name="ExerciseFrequency" value={formData.ExerciseFrequency} onChange={handleChange}>
                    <option value="Default">Select an option</option>
                    <option value="Everyday">Everyday</option>
                    <option value="4-5 times a week">4-5 times a week</option>
                    <option value="2-3 times a week">2-3 times a week</option>
                    <option value="once a week">Once a week</option>
                    <option value="never">This is my first time!</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>3. How long have you been exercising/lifting for?</td>
                <td>
                  <select name="Howlong" value={formData.Howlong} onChange={handleChange}>
                    <option value="Default">Select an option</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-4 years">3-4 years</option>
                    <option value="5-6 years">5-6 years</option>
                    <option value="7-8 years">7-8 years</option>
                    <option value="9-10 years">9-10 years</option>
                    <option value="10+ years">10+ years</option>
                    <option value="never">This is my first time!</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>4. What is your goal?</td>
                <td>
                  <select name="Goal" value={formData.Goal} onChange={handleChange}>
                    <option value="Default">Select an option</option>
                    <option value="Lose weight">Lose weight</option>
                    <option value="Gain muscle">Gain muscle</option>
                    <option value="Maintain weight">Maintain weight</option>
                    <option value="Improve endurance">Improve endurance</option>
                    <option value="Improve strength">Improve strength</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>5. What is your favorite type of exercise?</td>
                <td>
                  <select name="FavoriteExercise" value={formData.FavoriteExercise} onChange={handleChange}>
                    <option value="Default">Select an option</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Weightlifting">Weightlifting</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Crossfit">Crossfit</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>6. What is your favorite weightlifting exercise out of the big three?</td>
                <td>
                  <select name="FavoriteBigThree" value={formData.FavoriteBigThree} onChange={handleChange}>
                    <option value="Default">Select an option</option>
                    <option value="Squat">Squat</option>
                    <option value="Bench Press">Bench Press</option>
                    <option value="Deadlift">Deadlift</option>
                    <option value="I want to find out">I want to find out!</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>

          <div className={styles.submitContainer}>
            <button type="submit">Submit</button>
          </div>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} 

          <hr />
        </form>

        {/* Users Info Table (Dynamic) */}
        <section>
          <h2>Users Info</h2>
          <table border="1" cellSpacing="0" cellPadding="5">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Goal</th>
                <th>Favorite Exercise</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.username}</td>
                  <td>{user.Goal}</td>
                  <td>{user.FavoriteExercise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

    
        <div className={styles.submitContainer}>
          <button type="button" onClick={() => navigate('/results')}>Go to Exercise Selection Page</button>
        </div>

        <hr />
      </main>
    </div>
  );
}
