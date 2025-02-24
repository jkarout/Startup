// src/deadlift/Deadlift.jsx
import React from 'react';
import { useDeadliftLogic } from './deadliftLogic'; 
import styles from './deadlift.module.css'; 

export function Deadlift() {
  const { videoUrl, imageUrl } = useDeadliftLogic(); 
  return (
    <div className={styles.body}>
      <main>
        <section>
          <h2>Introduction to Deadlifts</h2>
          <p>
            The deadlift is a fundamental compound exercise that engages multiple
            muscle groups. It’s known as one of the most effective movements for
            building strength and power across your entire body.
          </p>
        </section>
        <hr />

        <section>
          <h2>Benefits of Deadlifts</h2>
          <ul>
            <li>
              Strengthens the posterior chain, including the back, glutes, and
              hamstrings.
            </li>
            <li>Improves core stability and balance.</li>
            <li>Increases grip strength.</li>
            <li>
              Boosts athletic performance by enhancing power and explosiveness.
            </li>
            <li>Improves posture by reinforcing proper spinal alignment.</li>
          </ul>
        </section>
        <hr />

        <section>
          <h2>Proper Deadlift Technique</h2>
          <ol>
            <li>
              Stand with your feet hip-width apart, with the barbell over the
              middle of your feet.
            </li>
            <li>
              Grip the bar with both hands, keeping your hands just outside your
              knees.
            </li>
            <li>Engage your core and keep your back straight.</li>
            <li>
              Bend your knees slightly, pushing your hips back, and lower your
              torso to grab the bar.
            </li>
            <li>
              Drive through your heels and extend your hips to lift the bar while
              keeping it close to your body.
            </li>
            <li>
              Lower the bar back to the ground in a controlled manner, maintaining
              a neutral spine.
            </li>
          </ol>
          <h3>Watch this video for a visual guide:</h3>
          <iframe
            width="400"
            height="250"
            src={videoUrl} // ✅ Use video URL from DeadliftLogic.js
            title="Proper Deadlift Technique Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </section>

        <hr />

        <section>
          <h2>Muscles Targeted</h2>
          <p>The deadlift targets the following muscle groups:</p>
          <ul>
            <li>Gluteus Maximus (glutes)</li>
            <li>Hamstrings</li>
            <li>Erector Spinae (lower back)</li>
            <li>Trapezius and Rhomboids (upper back)</li>
            <li>Quadriceps</li>
            <li>Core muscles (for stability)</li>
          </ul>
          <h3>Visual Representation:</h3>
          <img
            src={imageUrl} //image URL from DeadliftLogic.js
            alt="Muscles Targeted by Deadlift"
            width="300"
          />
        </section>
        <hr />

        <section>
          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li>Rounding your back during the lift.</li>
            <li>
              Pulling with your arms instead of driving through your legs and
              hips.
            </li>
            <li>Starting with the bar too far from your shins.</li>
            <li>Jerking the bar off the ground instead of lifting smoothly.</li>
            <li>Not engaging your core, leading to loss of stability.</li>
          </ul>
        </section>
        <hr />

        <section>
          <h2>Variations of Deadlifts</h2>
          <p>
            Try these variations to target different muscle groups or add variety
            to your workouts:
          </p>
          <ul>
            <li>Sumo Deadlift</li>
            <li>Romanian Deadlift</li>
            <li>Trap Bar Deadlift</li>
            <li>Deficit Deadlift</li>
            <li>Snatch-Grip Deadlift</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

