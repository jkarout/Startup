import React from 'react';
import { useResultsLogic } from './resultsLogic'; 
import styles from './results.module.css';

export function Results() {
  const { handleExerciseChange } = useResultsLogic(); 

  return (
    <div className={styles.body}>
      <main>
        <img
          src="https://www.thebxngclub.com/wp-content/uploads/2023/05/3Y3A1828.jpg"
          width="400"
          alt="Exercise"
        />
        
        <h1 className={styles.titles1}>Select the Exercise You Want to Learn About!</h1>
        <hr />

        <p>Here we will provide helpful information such as:</p>
        <ul>
          <li>How effective the exercise is</li>
          <li>How often you should do it</li>
          <li>The effect on the body (nervous system or muscles)</li>
          <li>The muscles the exercise targets</li>
        </ul>

        <p>Additionally, we include visuals and pictures showing proper technique and targeted muscles.</p>
        <hr />

        {/* ✅ Exercise Dropdown */}
        <label htmlFor="exercise">Choose an exercise:</label>
        <select id="exercise" name="exercise" className={styles.select} onChange={handleExerciseChange}>
          <option value="">-- Select an exercise --</option>
          <option value="/squat">Squats</option>
          <option value="/bench">Bench Press</option>
          <option value="/deadlift">Deadlift</option>
        </select>

        <hr />
      </main>
    </div>
  );
}

