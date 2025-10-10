import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <div className="hero-icon">🕉️</div>
          <h1>About GitaPath</h1>
          <p className="hero-tagline">
            Your digital companion for exploring the timeless wisdom of the Bhagavad Gita
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">18</span>
              <span className="stat-label">Chapters</span>
            </div>
            <div className="stat">
              <span className="stat-number">700</span>
              <span className="stat-label">Verses</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Translations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <h2>Our Mission</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">📖</div>
              <h3>Accessible Wisdom</h3>
              <p>
                Making the profound teachings of the Bhagavad Gita accessible to everyone through 
                modern technology and intuitive design.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🌟</div>
              <h3>Spiritual Growth</h3>
              <p>
                Supporting your spiritual journey with progress tracking, bookmarks, and 
                personalized reading experiences.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🤝</div>
              <h3>Community Learning</h3>
              <p>
                Building a community of seekers who find guidance and inspiration in 
                Krishna's eternal teachings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div className="feature-content">
                <h4>Smart Navigation</h4>
                <p>Jump to any chapter and verse instantly, or discover new wisdom with random verses.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌙</div>
              <div className="feature-content">
                <h4>Dark Mode</h4>
                <p>Comfortable reading experience with beautiful dark and light themes.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📚</div>
              <div className="feature-content">
                <h4>Multiple Translations</h4>
                <p>Read in Hindi, English, and word-by-word translations from renowned scholars.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔖</div>
              <div className="feature-content">
                <h4>Personal Bookmarks</h4>
                <p>Save your favorite verses and build your personal collection of wisdom.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <div className="feature-content">
                <h4>Reading Progress</h4>
                <p>Track your journey through all 18 chapters with detailed progress insights.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div className="feature-content">
                <h4>Responsive Design</h4>
                <p>Perfect reading experience across all devices - desktop, tablet, and mobile.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholars Section */}
      <section className="about-scholars">
        <div className="container">
          <h2>Featured Scholars</h2>
          <div className="scholars-grid">
            <div className="scholar-card">
              <div className="scholar-avatar">स्वामी</div>
              <div className="scholar-info">
                <h4>Swami Ramsukhdas</h4>
                <p className="scholar-lang">Hindi Translation</p>
                <p className="scholar-desc">
                  Renowned spiritual teacher whose Hindi commentaries make the Gita's 
                  profound wisdom accessible to millions.
                </p>
              </div>
            </div>
            <div className="scholar-card">
              <div className="scholar-avatar">प्रभु</div>
              <div className="scholar-info">
                <h4>A.C. Bhaktivedanta Swami Prabhupada</h4>
                <p className="scholar-lang">English Translation</p>
                <p className="scholar-desc">
                  Founder of ISKCON, whose English translations brought Krishna consciousness 
                  to the Western world.
                </p>
              </div>
            </div>
            <div className="scholar-card">
              <div className="scholar-avatar">शिव</div>
              <div className="scholar-info">
                <h4>Swami Sivananda</h4>
                <p className="scholar-lang">Word-by-Word Translation</p>
                <p className="scholar-desc">
                  Spiritual master whose detailed word-by-word translations reveal 
                  the depth of Sanskrit terminology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="about-developer">
        <div className="container">
          <div className="developer-card">
            <div className="developer-content">
              <h3>From the Developer</h3>
              <p>
                "The Bhagavad Gita has been a guiding light in my life, offering wisdom that transcends 
                time and circumstance. Through GitaPath, I hope to share this divine knowledge with 
                seekers around the world, making it easier to access, understand, and apply these 
                eternal teachings in our daily lives."
              </p>
              <div className="developer-blessing">
                <em>सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः</em>
                <br />
                <small>"May all beings be happy, may all beings be healthy"</small>
              </div>
              <div className="developer-signature">
                — Aditya, Creator of GitaPath
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default About;