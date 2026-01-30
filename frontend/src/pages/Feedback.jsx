import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useSnackbarContext } from '../components/SnackbarProvider'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Feedback({ user }) {
    const navigate = useNavigate()
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [feedback, setFeedback] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showError } = useSnackbarContext()

    useEffect(() => {
        document.title = 'Feedback - GitaPath | Share Your Thoughts';
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()

        if (!name.trim() || !feedback.trim()) {
            showError('Please fill in all required fields')
            return
        }

        if (feedback.length > 2000) {
            showError('Feedback must be less than 2000 characters')
            return
        }

        try {
            setIsSubmitting(true)
            const token = localStorage.getItem('token')

            const headers = token ? { Authorization: `Bearer ${token}` } : {}

            await axios.post(`${config.API_BASE_URL}/api/feedback`, {
                name: name.trim(),
                email: email.trim() || undefined,
                feedback: feedback.trim()
            }, { headers })

            showSuccess('Thank you for your feedback! We appreciate your input.')
            setName(user?.name || '')
            setEmail(user?.email || '')
            setFeedback('')

            // Navigate back after a short delay
            setTimeout(() => {
                navigate(-1)
            }, 1500)
        } catch (error) {
            console.error('Feedback submission error:', error)
            showError(error.response?.data?.error || 'Failed to submit feedback. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen pt-20 pb-20">
            <div className="container-custom max-w-3xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-charcoal-900 dark:text-white mb-4">
                        We Value Your Feedback
                    </h1>
                    <p className="text-lg text-charcoal-600 dark:text-charcoal-400">
                        Help us improve GitaPath by sharing your thoughts, suggestions, or reporting issues.
                    </p>
                </div>

                {/* Feedback Form */}
                <Card>
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    required
                                    disabled={!!user}
                                    className="w-full px-4 py-3 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {user && (
                                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                                        Logged in as {user.name}
                                    </p>
                                )}
                            </div>

                            {/* Email (Optional) */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                                    Email <span className="text-charcoal-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    disabled={!!user}
                                    className="w-full px-4 py-3 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {user && (
                                    <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                                        Logged in as {user.email}
                                    </p>
                                )}
                            </div>

                            {/* Feedback */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">
                                    Your Feedback <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Share your thoughts, suggestions, or report any issues you've experienced..."
                                    required
                                    rows={8}
                                    maxLength={2000}
                                    className="w-full px-4 py-3 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all resize-y"
                                ></textarea>
                                <div className="flex justify-end">
                                    <span className={`text-xs ${feedback.length > 1800 ? 'text-red-500' : 'text-charcoal-400'}`}>
                                        {feedback.length}/2000
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => navigate(-1)}
                                    disabled={isSubmitting}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isSubmitting}
                                    className="flex-1"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : 'Submit Feedback'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}
