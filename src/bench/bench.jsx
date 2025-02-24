// src/bench/Bench.jsx
import React from 'react';
import { useBenchLogic } from './benchLogic'; 
import styles from './bench.module.css'; 

export function Bench() {
  const { videoUrl, imageUrl } = useBenchLogic(); // logic from benchLogic.js

  return (
    <div className={styles.body}>
      <main>
        <section>
          <h2>Introduction to Bench Press</h2>
          <p>
            The bench press is one of the most popular upper body exercises for
            building chest strength and mass. It primarily targets the pectoral
            muscles while engaging the triceps and shoulders.
          </p>
        </section>
        <hr />

        <section>
          <h2>Benefits of Bench Press</h2>
          <ul>
            <li>Builds strength and size in the chest muscles.</li>
            <li>Improves pushing strength and overall upper body power.</li>
            <li>Engages supporting muscles like triceps and deltoids.</li>
            <li>Enhances bone density and joint health.</li>
            <li>
              Great for athletic performance, especially in sports requiring upper
              body power.
            </li>
          </ul>
        </section>
        <hr />

        <section>
          <h2>Proper Bench Press Technique</h2>
          <ol>
            <li>Lie flat on the bench with your eyes directly under the bar.</li>
            <li>
              Grip the bar slightly wider than shoulder-width apart, palms facing
              forward.
            </li>
            <li>
              Engage your shoulder blades and keep them retracted throughout the
              lift.
            </li>
            <li>
              Lower the bar to your mid-chest, keeping your elbows at about a
              45-degree angle.
            </li>
            <li>
              Press the bar upward until your arms are fully extended but not
              locked out.
            </li>
            <li>Repeat for the desired number of repetitions.</li>
          </ol>
          <h3>Watch this video for a visual guide:</h3>
          <iframe
            width="400"
            height="250"
            src={videoUrl} // ✅ Use video URL from BenchLogic.js
            title="Proper Bench Press Technique Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </section>
        <hr />

        <section>
          <h2>Muscles Targeted</h2>
          <p>The bench press targets the following muscle groups:</p>
          <ul>
            <li>Pectoralis Major (chest)</li>
            <li>Triceps Brachii (back of the arm)</li>
            <li>Anterior Deltoids (front shoulders)</li>
            <li>Latissimus Dorsi (lats)</li>
            <li>Core muscles (for stability)</li>
          </ul>
          <h3>Visual Representation:</h3>
          <img
            src={imageUrl} //image URL from BenchLogic.js
            alt="Muscles Targeted by Bench Press"
            width="300"
          />
        </section>
        <hr />

        <section>
          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li>Letting your elbows flare out too much.</li>
            <li>Arching your back excessively.</li>
            <li>Failing to keep your feet flat on the ground.</li>
            <li>Lowering the bar too fast or bouncing it off your chest.</li>
            <li>Using a grip that’s too narrow or too wide.</li>
          </ul>
        </section>
        <hr />

        <section>
          <h2>Variations of Bench Press</h2>
          <p>
            Try these variations to target different muscle groups or add variety
            to your workouts:
          </p>
          <ul>
            <li>Incline Bench Press</li>
            <li>Decline Bench Press</li>
            <li>Dumbbell Bench Press</li>
            <li>Close-Grip Bench Press</li>
            <li>Floor Press</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

