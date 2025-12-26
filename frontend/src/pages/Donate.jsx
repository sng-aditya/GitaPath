import React from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Donate() {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-sand-50 dark:bg-charcoal-900 border-b border-sand-200 dark:border-charcoal-800">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 dark:text-white mb-6">
            Support GitaPath
          </h1>
          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto leading-relaxed">
            Help us keep the divine wisdom of the Bhagavad Gita freely accessible to all.
            Your support fuels our mission to serve the global spiritual community.
          </p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Mission */}
            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed text-lg">
                GitaPath is a passion project created to share the timeless wisdom of the
                Bhagavad Gita with spiritual seekers around the world. As a solo developer,
                I've invested countless hours building this platform with deep reverence and
                dedication to providing an authentic, beautiful reading experience.
              </p>
            </section>

            {/* Impact */}
            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white mb-6">Your Impact</h2>
              <Card className="p-8 bg-gradient-to-br from-saffron-50 to-white dark:from-charcoal-800 dark:to-charcoal-900">
                <p className="text-charcoal-700 dark:text-charcoal-300 mb-6 font-medium">Your generous support helps us:</p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Maintain server infrastructure",
                    "Add new features regularly",
                    "Enhance user experience",
                    "Develop mobile applications",
                    "Support multiple languages",
                    "Add audio recitations",
                    "Keep the platform free"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-charcoal-600 dark:text-charcoal-400">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* Donation Options */}
            <section>
              <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white mb-6">Ways to Support</h2>
              <div className="flex justify-center">
                <Card className="p-8 text-center max-w-md" hover>
                  <div className="text-5xl mb-4">🇮🇳</div>
                  <h3 className="font-bold text-charcoal-900 dark:text-white mb-3 text-xl">UPI Payment</h3>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-6">Support via UPI payment directly</p>
                  <div className="bg-sand-50 dark:bg-charcoal-800 p-4 rounded-lg mb-6">
                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mb-2">UPI ID</p>
                    <p className="font-mono text-lg font-bold text-saffron-600 dark:text-saffron-400">adityas301@fifedral</p>
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full justify-center"
                    onClick={() => {
                      navigator.clipboard.writeText('adityas301@fifedral')
                      alert('UPI ID copied to clipboard!')
                    }}
                  >
                    Copy UPI ID
                  </Button>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="p-6 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800">
              <h3 className="font-bold text-charcoal-900 dark:text-white mb-4">Other Ways to Help</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-charcoal-900 dark:text-white mb-1">📢 Share GitaPath</h4>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400">Tell your friends and spiritual community about us. Word of mouth is incredibly valuable!</p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal-900 dark:text-white mb-1">💭 Leave Feedback</h4>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400">Share your experience, suggestions, or feature requests to shape the future.</p>
                </div>
                <div>
                  <h4 className="font-medium text-charcoal-900 dark:text-white mb-1">🙏 Spiritual Support</h4>
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-400">Keep this project in your prayers. Spiritual support is just as valuable as financial support.</p>
                </div>
              </div>
            </Card>

            <div className="text-center p-6 rounded-2xl bg-saffron-50 dark:bg-charcoal-800 border border-saffron-100 dark:border-charcoal-700">
              <h3 className="font-bold text-charcoal-900 dark:text-white mb-4">With Deep Gratitude</h3>
              <p className="text-charcoal-600 dark:text-charcoal-400 text-sm mb-6 leading-relaxed">
                Whether you choose to support financially or simply use GitaPath in your
                spiritual practice, you are part of this sacred mission.
              </p>
              <div className="font-devanagari text-lg text-saffron-600 dark:text-saffron-400 mb-2">
                "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः"
              </div>
              <div className="text-xs text-charcoal-500 italic">
                "Whatever a great person does, others follow in their footsteps."
                <br />— Bhagavad Gita 3.21
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}