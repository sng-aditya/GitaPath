import React from 'react'

export default function Donate() {
  return (
    <div className="page-container">
      <div className="container">
        <div className="donate-page">
          <div className="page-header">
            <h1>Support GitaPath</h1>
            <p className="page-subtitle">
              Help us keep the divine wisdom of the Bhagavad Gita freely accessible to all
            </p>
          </div>

          <div className="donate-content">
            <section className="mission-section">
              <h2>Our Mission</h2>
              <p>
                GitaPath is a passion project created to share the timeless wisdom of the 
                Bhagavad Gita with spiritual seekers around the world. As a solo developer, 
                I've invested countless hours building this platform with deep reverence and 
                dedication to providing an authentic, beautiful reading experience.
              </p>
            </section>

            <section className="impact-section">
              <h2>Your Impact</h2>
              <p>Your generous support helps us:</p>
              <ul className="impact-list">
                <li>Maintain server infrastructure and hosting costs</li>
                <li>Add new features and improvements regularly</li>
                <li>Enhance the user experience with better design</li>
                <li>Develop mobile applications</li>
                <li>Support multiple languages and translations</li>
                <li>Add audio recitations and pronunciations</li>
                <li>Keep the platform completely free for everyone</li>
              </ul>
            </section>

            <section className="donation-options">
              <h2>Ways to Support</h2>
              
              <div className="support-methods">
                <div className="support-card">
                  <h3>Buy Me a Coffee</h3>
                  <p>Support the developer with a coffee to fuel late-night coding sessions</p>
                  <button className="support-btn coffee-btn">Buy Me a Coffee</button>
                </div>

                <div className="support-card">
                  <h3>UPI Payment</h3>
                  <p>For users in India, support via UPI payment</p>
                  <button className="support-btn upi-btn">Pay via UPI</button>
                </div>

                <div className="support-card">
                  <h3>Patreon</h3>
                  <p>Become a patron and support ongoing development</p>
                  <button className="support-btn patreon-btn">Support on Patreon</button>
                </div>

                <div className="support-card">
                  <h3>PayPal</h3>
                  <p>One-time or recurring donations via PayPal</p>
                  <button className="support-btn paypal-btn">Donate via PayPal</button>
                </div>
              </div>
            </section>

            <section className="other-ways">
              <h2>Other Ways to Help</h2>
              <div className="help-options">
                <div className="help-card">
                  <h3>Share GitaPath</h3>
                  <p>Tell your friends and spiritual community about GitaPath. Word of mouth is incredibly valuable!</p>
                </div>
                <div className="help-card">
                  <h3>Leave Feedback</h3>
                  <p>Share your experience, suggestions, or feature requests. Your input shapes the future of GitaPath.</p>
                </div>
                <div className="help-card">
                  <h3>Spiritual Support</h3>
                  <p>Keep this project in your prayers and meditations. Spiritual support is just as valuable as financial support.</p>
                </div>
              </div>
            </section>

            <section className="gratitude-section">
              <h2>With Deep Gratitude</h2>
              <p>
                Whether you choose to support financially or simply use GitaPath in your 
                spiritual practice, you are part of this sacred mission. The Bhagavad Gita 
                teaches us about selfless service (seva), and your support allows us to serve 
                the global spiritual community.
              </p>
              <p className="sanskrit-quote">
                "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः"<br/>
                <em>"Whatever a great person does, others follow in their footsteps."</em><br/>
                — Bhagavad Gita 3.21
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}