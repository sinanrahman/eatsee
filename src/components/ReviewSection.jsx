import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Send, CheckCircle } from 'lucide-react';
import { API } from '../utils/api';

const FALLBACK_REVIEWS = [
    {
        id: '1',
        name: "Sarah Johnson",
        role: "Regular Customer",
        content: "The Pathiri is incredibly soft, just like how my grandmother used to make. Finding authentic taste like this in a store is rare.",
        rating: 5,
        approved: true,
    },
    {
        id: '2',
        name: "Mohammed Rafi",
        role: "Grocery Shop Owner",
        content: "Eatsee Foods products are the fastest-selling items in my shop. Their supply is always on time and the quality is consistent.",
        rating: 5,
        approved: true,
    },
    {
        id: '3',
        name: "Anjali Menon",
        role: "Catering Head",
        content: "We've been using Eatsee for our wedding orders. Their Idiyappam remains soft even hours after delivery. Highly recommended!",
        rating: 5,
        approved: true,
    },
];

const StarRating = ({ value, onChange, size = 28 }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => onChange && onChange(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
            >
                <Star
                    size={size}
                    className={star <= value
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300 dark:text-zinc-600 hover:text-amber-300'}
                />
            </button>
        ))}
    </div>
);

const ReviewCard = ({ review, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-sm relative group"
    >
        <Quote className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={50} />
        <div className="flex gap-1 mb-5">
            {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
            ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-7 leading-relaxed italic text-sm md:text-base">
            "{review.content}"
        </p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                {review.name[0]}
            </div>
            <div>
                <h4 className="font-bold dark:text-white text-sm">{review.name}</h4>
                <p className="text-xs text-gray-500">{review.role || 'Customer'}</p>
            </div>
        </div>
    </motion.div>
);

const ReviewSection = () => {
    const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        API.getReviews().then(data => {
            if (data?.reviews?.length > 0) setReviews(data.reviews);
        }).catch(() => { /* keep fallback */ });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !content) return setError('Name and review are required');
        setLoading(true);
        setError('');
        try {
            const result = await API.submitReview({ name, role, content, rating });
            if (result.success) {
                setSuccess(true);
                setName(''); setRole(''); setContent(''); setRating(5);
            } else {
                setError(result.error || 'Submission failed');
            }
        } catch {
            setError('Could not connect. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-padding bg-zinc-50 dark:bg-black">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <span className="text-primary font-mono font-bold uppercase tracking-[0.3em] text-xs">Real Stories</span>
                    <h2 className="text-4xl md:text-6xl font-playfair font-black dark:text-white leading-tight tracking-tighter">
                        What Our<br />
                        <span className="text-primary italic">Community Says.</span>
                    </h2>
                </div>

                {/* Review Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[...reviews].sort((a, b) => b.rating - a.rating).slice(0, 3).map((review, i) => (
                        <ReviewCard key={review.id} review={review} index={i} />
                    ))}
                </div>

                {/* Write a Review CTA */}
                <div className="relative">
                    <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-zinc-900 dark:to-zinc-900 rounded-[3rem] p-10 md:p-16 border border-primary/10 dark:border-zinc-800 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

                        <AnimatePresence mode="wait">
                            {!showForm && !success && (
                                <motion.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="space-y-3 text-center md:text-left">
                                        <h3 className="text-2xl md:text-3xl font-playfair font-bold dark:text-white">
                                            Tried Eatsee Foods?
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            We'd love to hear about your experience!
                                        </p>
                                        <div className="flex justify-center md:justify-start">
                                            <StarRating value={5} size={22} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="shrink-0 px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-xl hover:shadow-primary/30 flex items-center gap-3"
                                    >
                                        <Star size={18} className="fill-white" />
                                        Write a Review
                                    </button>
                                </motion.div>
                            )}

                            {showForm && !success && (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6 relative z-10"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold dark:text-white">Share Your Review</h3>
                                        <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Rating *</p>
                                        <StarRating value={rating} onChange={setRating} size={32} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="Your name"
                                                className="w-full px-5 py-3 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Role</label>
                                            <input
                                                type="text"
                                                value={role}
                                                onChange={e => setRole(e.target.value)}
                                                placeholder="e.g. Homemaker, Shop Owner"
                                                className="w-full px-5 py-3 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Review *</label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={content}
                                            onChange={e => setContent(e.target.value)}
                                            placeholder="Tell us about your experience with Eatsee Foods..."
                                            className="w-full px-5 py-3 bg-white dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white resize-none"
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        <Send size={16} />
                                        {loading ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                    <p className="text-xs text-gray-400">Reviews appear after our team approves them.</p>
                                </motion.form>
                            )}

                            {success && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-4 py-8"
                                >
                                    <CheckCircle size={56} className="mx-auto text-primary" />
                                    <h3 className="text-2xl font-bold dark:text-white">Thank you for your review!</h3>
                                    <p className="text-gray-500">It will be published once approved by our team.</p>
                                    <button onClick={() => { setSuccess(false); setShowForm(false); }} className="px-8 py-3 bg-primary text-white font-bold rounded-xl">
                                        Done
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
