import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-white dark:bg-charcoal-900 border-t border-charcoal-200 dark:border-charcoal-800 py-12 mt-auto transition-colors duration-300">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
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
              <li><a href="/chapters" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Chapters</a></li>
              <li><a href="/verse-of-day" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Daily Verse</a></li>
              <li><a href="/about" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">About Us</a></li>
              <li><a href="/donate" className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors">Support Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-charcoal-900 dark:text-white mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/feedback')}
                  className="text-charcoal-600 dark:text-charcoal-400 hover:text-saffron-500 dark:hover:text-saffron-400 transition-colors text-left"
                >
                  Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-charcoal-200 dark:border-charcoal-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-charcoal-500 dark:text-charcoal-500 text-sm">
            © {new Date().getFullYear()} GitaPath. All rights reserved.
          </p>
          <p className="text-charcoal-500 dark:text-charcoal-500 text-sm">
            Made by <a
              href="https://x.com/AdityaSingh_Me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-saffron-600 hover:text-saffron-700 font-medium transition-colors"
            >
              Aditya Singh
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}