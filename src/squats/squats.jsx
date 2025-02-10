import React from 'react';
import styles from './squat.module.css'; 

export function Squat() {
  return (
    <div className={styles.body}>
      
      <main>
        <section>
          <h2>Introduction to Squats</h2>
          <p>
            Squats are one of the most effective exercises for building lower body
            strength, improving mobility, and enhancing overall fitness. They
            target major muscle groups like the quadriceps, hamstrings, glutes,
            and calves.
          </p>
        </section>
        <hr />

        <section>
          <h2>Benefits of Squats</h2>
          <ul>
            <li>Builds strength in the lower body.</li>
            <li>Improves core stability and balance.</li>
            <li>Boosts athletic performance by enhancing power and mobility.</li>
            <li>Can help in improving posture.</li>
            <li>Burns calories and aids in weight loss.</li>
          </ul>
        </section>
        <hr />

        <section>
          <h2>Proper Squat Technique</h2>
          <ol>
            <li>
              Stand with your feet shoulder-width apart and toes slightly pointing
              outward.
            </li>
            <li>Keep your chest up, shoulders back, and engage your core.</li>
            <li>
              Lower your body by bending at the hips and knees, as if sitting into
              a chair.
            </li>
            <li>
              Ensure your knees stay in line with your toes and don’t extend past
              your feet.
            </li>
            <li>
              Go down until your thighs are parallel to the ground or lower if
              your mobility allows.
            </li>
            <li>Press through your heels to return to the starting position.</li>
          </ol>
          <h3>Watch this video for a visual guide:</h3>
          <iframe
            width="400"
            height="250"
            src="https://www.youtube.com/embed/PPmvh7gBTi0"
            title="Proper Squat Technique Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <hr />
        </section>

        <section>
          <h2>Muscles Targeted</h2>
          <p>Squats target several muscle groups, including:</p>
          <ul>
            <li>Quadriceps</li>
            <li>Hamstrings</li>
            <li>Glutes</li>
            <li>Calves</li>
            <li>Core muscles (for stability)</li>
          </ul>
          <h3>Visual Representation:</h3>
          <img
            src="https://cdn.shopify.com/s/files/1/1633/7705/files/what_muscles_do_squats_work_480x480.png?v=1630671679"
            alt="Muscles Targeted by Squats"
            width="300"
          />
        </section>
        <hr />

        <section>
          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li>Allowing your knees to collapse inward.</li>
            <li>Lifting your heels off the ground.</li>
            <li>Not keeping your chest up and back straight.</li>
            <li>Squatting too shallow, not going deep enough.</li>
            <li>Placing too much weight on your toes instead of your heels.</li>
          </ul>
        </section>
        <hr />

        <section>
          <h2>Variations of Squats</h2>
          <p>
            If you're looking to mix up your routine, try these squat variations:
          </p>
          <ul>
            <li>Bodyweight Squat</li>
            <li>Goblet Squat</li>
            <li>Barbell Back Squat</li>
            <li>Front Squat</li>
            <li>Sumo Squat</li>
            <li>Bulgarian Split Squat</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
