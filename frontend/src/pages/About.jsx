import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

function About() {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-sand-50 dark:bg-charcoal-900 border-b border-sand-200 dark:border-charcoal-800">
        <div className="container-custom text-center relative z-10">
          <div className="text-6xl mb-6 animate-fade-in">ॐ</div>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 dark:text-white mb-6">
            About GitaPath
          </h1>
          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Your digital companion for exploring the timeless wisdom of the Bhagavad Gita.
            Designed for the modern seeker, built with ancient reverence.
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-saffron-500 mb-1">18</div>
              <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-saffron-500 mb-1">700</div>
              <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Verses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-saffron-500 mb-1">3</div>
              <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Translations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
            To make the profound teachings of the Bhagavad Gita accessible to everyone through modern technology and intuitive design.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center" hover>
            <div className="text-4xl mb-6">📖</div>
            <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">Accessible Wisdom</h3>
            <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
              Breaking down language barriers with multiple translations and clear explanations for every verse.
            </p>
          </Card>
          <Card className="p-8 text-center" hover>
            <div className="text-4xl mb-6">🌟</div>
            <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">Spiritual Growth</h3>
            <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
              Supporting your journey with progress tracking, bookmarks, and personalized reading experiences.
            </p>
          </Card>
          <Card className="p-8 text-center" hover>
            <div className="text-4xl mb-6">🤝</div>
            <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">Community Learning</h3>
            <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
              Building a community of seekers who find guidance and inspiration in Krishna's eternal teachings.
            </p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-sand-50 dark:bg-charcoal-800/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-4">Features</h2>
            <p className="text-charcoal-600 dark:text-charcoal-400">Designed for your spiritual practice</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎯", title: "Smart Navigation", desc: "Jump to any chapter and verse instantly, or discover new wisdom with random verses." },
              { icon: "🌙", title: "Dark Mode", desc: "Comfortable reading experience with beautiful dark and light themes." },
              { icon: "📚", title: "Multiple Translations", desc: "Read in Hindi, English, and word-by-word translations from renowned scholars." },
              { icon: "🔖", title: "Personal Bookmarks", desc: "Save your favorite verses and build your personal collection of wisdom." },
              { icon: "📊", title: "Reading Progress", desc: "Track your journey through all 18 chapters with detailed progress insights." },
              { icon: "📱", title: "Responsive Design", desc: "Perfect reading experience across all devices - desktop, tablet, and mobile." }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-6 bg-white dark:bg-charcoal-900 rounded-xl border border-charcoal-100 dark:border-charcoal-800">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h4 className="font-bold text-charcoal-900 dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholars Section */}
      <section className="py-20 container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-4">Featured Scholars</h2>
          <p className="text-charcoal-600 dark:text-charcoal-400">Wisdom from the masters</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Swami Ramsukhdas", lang: "Hindi Translation", desc: "Renowned spiritual teacher whose Hindi commentaries make the Gita's profound wisdom accessible to millions.", avatar: "स्वामी" },
            { name: "A.C. Bhaktivedanta Swami Prabhupada", lang: "English Translation", desc: "Founder of ISKCON, whose English translations brought Krishna consciousness to the Western world.", avatar: "प्रभु" },
            { name: "Swami Sivananda", lang: "Word-by-Word Translation", desc: "Spiritual master whose detailed word-by-word translations reveal the depth of Sanskrit terminology.", avatar: "शिव" }
          ].map((scholar, idx) => (
            <Card key={idx} className="p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-saffron-100 dark:bg-saffron-900/30 rounded-full flex items-center justify-center text-saffron-700 dark:text-saffron-300 font-bold text-xl mb-4">
                {scholar.avatar}
              </div>
              <h4 className="font-bold text-charcoal-900 dark:text-white mb-1">{scholar.name}</h4>
              <p className="text-xs font-medium text-saffron-600 dark:text-saffron-400 uppercase tracking-wider mb-3">{scholar.lang}</p>
              <p className="text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                {scholar.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-gradient-to-br from-saffron-500 to-saffron-600 text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">From the Developer</h3>
            <p className="text-xl leading-relaxed mb-8 font-serif italic opacity-90">
              "The Bhagavad Gita has been a guiding light in my life, offering wisdom that transcends
              time and circumstance. Through GitaPath, I hope to share this divine knowledge with
              seekers around the world, making it easier to access, understand, and apply these
              eternal teachings in our daily lives."
            </p>
            <div className="mb-8">
              <p className="text-2xl font-devanagari mb-2">सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः</p>
              <p className="text-sm opacity-80">"May all beings be happy, may all beings be healthy"</p>
            </div>
            <div className="font-bold text-lg">
              — Aditya, Creator of GitaPath
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;