import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-charcoal-900 border-t border-charcoal-200 dark:border-charcoal-800 py-12 mt-auto transition-colors duration-300">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
              <span>ॐ</span>
              <span>GitaPath</span>
            </div>
            <p className="text-charcoal-600 dark:text-charcoal-400 max-w-sm">
              Your daily companion for spiritual growth and wisdom from the Bhagavad Gita. Modern insights for a timeless journey.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-charcoal-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Home</a></li>
              <li><a href="/chapters" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Chapters</a></li>
              <li><a href="/verse-of-day" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Daily Verse</a></li>
              <li><a href="/about" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-charcoal-900 dark:text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="/donate" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Support Us</a></li>
              <li><a href="#" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-200 dark:border-charcoal-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-charcoal-500 dark:text-charcoal-500 text-sm">
            © {new Date().getFullYear()} GitaPath. All rights reserved.
          </p>
          <p className="text-charcoal-500 dark:text-charcoal-500 text-sm flex items-center gap-1">
            Made with <span className="text-red-500">❤</span> for the Dharma
          </p>
        </div>
      </div>
    </footer>
  )
}