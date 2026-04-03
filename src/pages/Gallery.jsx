import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Upload, Star, Camera, Image, ShieldCheck, Trash2, Check, Plus, Lock } from 'lucide-react';
import { API } from '../utils/api';

const FALLBACK_ITEMS = [
    { id: '1', type: "Production", imageUrl: "/image/logo.png", title: "Traditional Kitchen", approved: true, isOwner: true },
    { id: '2', type: "Food", imageUrl: "/image/pathiri.jpeg", title: "Freshly Made Pathiri", approved: true, isOwner: true },
    { id: '3', type: "Food", imageUrl: "/image/idiyappam.jpeg", title: "Steaming Idiyappam", approved: true, isOwner: true },
    { id: '4', type: "Food", imageUrl: "/image/vellappam.jpeg", title: "Crispy Vellappam", approved: true, isOwner: true },
    { id: '5', type: "Food", imageUrl: "/image/chappathy.jpg", title: "Soft Chappathi", approved: true, isOwner: true },
];

const categories = ["All", "Food", "Production", "Delivery", "Customer"];

const StarRating = ({ value, onChange, size = 24 }) => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => onChange && onChange(star)}
                className="transition-transform hover:scale-110"
            >
                <Star
                    size={size}
                    className={star <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-zinc-600'}
                />
            </button>
        ))}
    </div>
);

const Gallery = () => {
    const [filter, setFilter] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);
    const [items, setItems] = useState(FALLBACK_ITEMS);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('gallery'); // gallery | upload | review | owner

    // Owner panel state
    const [isOwner, setIsOwner] = useState(false);
    const [ownerKeyInput, setOwnerKeyInput] = useState('');
    const [ownerKey, setOwnerKey] = useState('');
    const [ownerLoginError, setOwnerLoginError] = useState('');
    const [pendingItems, setPendingItems] = useState([]);
    const [pendingReviews, setPendingReviews] = useState([]);

    // Upload state
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadPreview, setUploadPreview] = useState('');
    const [uploadTitle, setUploadTitle] = useState('');
    const [uploadName, setUploadName] = useState('');
    const [uploadType, setUploadType] = useState('Food');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState('');
    const [uploadError, setUploadError] = useState('');

    // Review form state
    const [reviewName, setReviewName] = useState('');
    const [reviewRole, setReviewRole] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState('');
    const [reviewError, setReviewError] = useState('');

    // Owner upload
    const [ownerUploadFile, setOwnerUploadFile] = useState(null);
    const [ownerUploadPreview, setOwnerUploadPreview] = useState('');
    const [ownerUploadTitle, setOwnerUploadTitle] = useState('');
    const [ownerUploadType, setOwnerUploadType] = useState('Production');

    const fetchGallery = async () => {
        try {
            const data = await API.getGallery('All', isOwner ? 'owner' : '');
            if (data.items) setItems(data.items);
        } catch {
            // keep fallback
        } finally {
            setLoading(false);
        }
    };

    const fetchPending = async () => {
        if (!isOwner) return;
        try {
            const galleryData = await API.getGallery('All', 'owner');
            if (galleryData.items) {
                setPendingItems(galleryData.items.filter(i => !i.approved));
                setItems(galleryData.items);
            }
            const reviewData = await API.getReviews('owner');
            if (reviewData.reviews) {
                setPendingReviews(reviewData.reviews.filter(r => !r.approved));
            }
        } catch { }
    };

    useEffect(() => { fetchGallery(); }, []);
    useEffect(() => { if (isOwner) fetchPending(); }, [isOwner]);

    const filteredItems = filter === "All"
        ? items.filter(i => i.approved || isOwner)
        : items.filter(i => i.type === filter && (i.approved || isOwner));

    const handleFileChange = (e, forOwner = false) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (forOwner) {
                setOwnerUploadFile(file);
                setOwnerUploadPreview(reader.result);
            } else {
                setUploadFile(file);
                setUploadPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleCustomerUpload = async (e) => {
        e.preventDefault();
        if (!uploadFile) return setUploadError('Please select an image');
        setUploadLoading(true);
        setUploadError('');
        try {
            const formData = new FormData();
            formData.append('image', uploadFile);
            formData.append('title', uploadTitle || 'Customer Photo');
            formData.append('customerName', uploadName || 'Anonymous');
            const result = await API.uploadCustomerPhoto(formData);
            if (result.success) {
                setUploadSuccess('✅ Your photo was submitted! It will appear after review.');
                setUploadFile(null); setUploadPreview(''); setUploadTitle(''); setUploadName('');
            } else {
                setUploadError(result.error || 'Upload failed');
            }
        } catch {
            setUploadError('Could not connect to server. Please try again.');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewName || !reviewContent) return setReviewError('Name and review are required');
        setReviewLoading(true);
        setReviewError('');
        try {
            const result = await API.submitReview({ name: reviewName, role: reviewRole, content: reviewContent, rating: reviewRating });
            if (result.success) {
                setReviewSuccess('✅ Review submitted! It will appear after approval.');
                setReviewName(''); setReviewRole(''); setReviewContent(''); setReviewRating(5);
            } else {
                setReviewError(result.error || 'Submission failed');
            }
        } catch {
            setReviewError('Could not connect to server. Please try again.');
        } finally {
            setReviewLoading(false);
        }
    };

    const handleOwnerLogin = () => {
        // Simple client-side check — real validation happens server-side on each action
        if (ownerKeyInput.length < 4) return setOwnerLoginError('Invalid key');
        setOwnerKey(ownerKeyInput);
        setIsOwner(true);
        setOwnerLoginError('');
        setActiveTab('owner');
    };

    const handleOwnerUpload = async (e) => {
        e.preventDefault();
        if (!ownerUploadFile) return;
        setUploadLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', ownerUploadFile);
            formData.append('title', ownerUploadTitle || 'Gallery Photo');
            formData.append('type', ownerUploadType);
            formData.append('ownerKey', ownerKey);
            const result = await API.uploadOwnerPhoto(formData);
            if (result.success) {
                setOwnerUploadFile(null); setOwnerUploadPreview(''); setOwnerUploadTitle('');
                fetchPending();
            } else {
                alert(result.error || 'Upload failed');
            }
        } catch {
            alert('Server error');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleApproveGallery = async (id) => {
        await API.approveGalleryItem(id, ownerKey);
        fetchPending();
    };

    const handleDeleteGallery = async (id) => {
        if (!window.confirm('Delete this item?')) return;
        await API.deleteGalleryItem(id, ownerKey);
        fetchPending();
    };

    const handleApproveReview = async (id) => {
        await API.approveReview(id, ownerKey);
        fetchPending();
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        await API.deleteReview(id, ownerKey);
        fetchPending();
    };

    const getImageSrc = (item) => {
        if (item.imageUrl?.startsWith('/uploads/')) return API.getImageUrl(item.imageUrl);
        return item.imageUrl;
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-dark-bg">
            <section className="section-padding">
                <div className="max-w-7xl mx-auto space-y-10">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Visual Journey</span>
                        <h1 className="text-5xl md:text-7xl font-playfair font-black dark:text-white">Our Gallery</h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            A visual celebration of our food, process, and happy customers.
                        </p>
                    </div>

                    {/* Tab Bar */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { id: 'gallery', label: 'Browse Gallery', icon: Image },
                            { id: 'upload', label: 'Share a Photo', icon: Camera },
                            { id: 'review', label: 'Write a Review', icon: Star },
                            { id: 'owner', label: isOwner ? 'Owner Panel' : 'Owner Login', icon: isOwner ? ShieldCheck : Lock },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-zinc-100 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 hover:text-primary'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                                {tab.id === 'owner' && isOwner && (pendingItems.length + pendingReviews.length) > 0 && (
                                    <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {pendingItems.length + pendingReviews.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* ── GALLERY TAB ── */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'gallery' && (
                            <motion.div key="gallery" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                                {/* Filter chips */}
                                <div className="flex justify-center flex-wrap gap-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilter(cat)}
                                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${filter === cat
                                                ? 'bg-primary text-white scale-105'
                                                : 'bg-zinc-100 dark:bg-zinc-900 text-gray-500 hover:text-primary'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    <AnimatePresence>
                                        {filteredItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.85 }}
                                                transition={{ duration: 0.35 }}
                                                className={`group relative cursor-pointer aspect-square rounded-[2rem] overflow-hidden ${!item.approved ? 'ring-2 ring-amber-400' : ''}`}
                                                onClick={() => setSelectedImage(item)}
                                            >
                                                <img
                                                    src={getImageSrc(item)}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                {!item.approved && (
                                                    <div className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                                                        Pending
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-3">
                                                    <Maximize2 size={32} />
                                                    <p className="font-bold tracking-wide text-center px-4">{item.title}</p>
                                                    <span className="text-xs uppercase bg-primary px-3 py-1 rounded-full">{item.type}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {filteredItems.length === 0 && !loading && (
                                    <div className="text-center py-20">
                                        <p className="text-gray-400 text-xl">No photos in this category yet.</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* ── UPLOAD TAB ── */}
                        {activeTab === 'upload' && (
                            <motion.div key="upload" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="max-w-xl mx-auto bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-10 border border-gray-100 dark:border-zinc-800 shadow-xl space-y-8">
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto">
                                            <Camera size={32} />
                                        </div>
                                        <h2 className="text-2xl font-playfair font-bold dark:text-white">Share Your Food Moments</h2>
                                        <p className="text-gray-500 text-sm">Upload a photo of our food. It will appear in the gallery after review.</p>
                                    </div>

                                    {uploadSuccess ? (
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center text-green-700 dark:text-green-400 font-medium">
                                            {uploadSuccess}
                                        </div>
                                    ) : (
                                        <form onSubmit={handleCustomerUpload} className="space-y-6">
                                            {/* Image Drop Zone */}
                                            <label className="block cursor-pointer">
                                                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${uploadPreview ? 'border-primary' : 'border-gray-200 dark:border-zinc-700 hover:border-primary'}`}>
                                                    {uploadPreview ? (
                                                        <img src={uploadPreview} alt="Preview" className="mx-auto max-h-48 rounded-xl object-cover" />
                                                    ) : (
                                                        <>
                                                            <Upload size={40} className="mx-auto text-gray-300 mb-3" />
                                                            <p className="text-gray-500 text-sm">Click to choose a photo</p>
                                                            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP up to 5MB</p>
                                                        </>
                                                    )}
                                                </div>
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e)} />
                                            </label>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Name</label>
                                                <input
                                                    type="text"
                                                    value={uploadName}
                                                    onChange={e => setUploadName(e.target.value)}
                                                    placeholder="John Doe"
                                                    className="w-full px-5 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Photo Caption (optional)</label>
                                                <input
                                                    type="text"
                                                    value={uploadTitle}
                                                    onChange={e => setUploadTitle(e.target.value)}
                                                    placeholder="e.g. Pathiri dinner last night!"
                                                    className="w-full px-5 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                                />
                                            </div>

                                            {uploadError && <p className="text-red-500 text-sm text-center">{uploadError}</p>}

                                            <button
                                                type="submit"
                                                disabled={uploadLoading || !uploadFile}
                                                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                            >
                                                <Upload size={18} />
                                                {uploadLoading ? 'Uploading...' : 'Submit Photo'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* ── REVIEW TAB ── */}
                        {activeTab === 'review' && (
                            <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="max-w-xl mx-auto bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-10 border border-gray-100 dark:border-zinc-800 shadow-xl space-y-8">
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-3xl flex items-center justify-center mx-auto">
                                            <Star size={32} className="fill-amber-400 text-amber-400" />
                                        </div>
                                        <h2 className="text-2xl font-playfair font-bold dark:text-white">Share Your Experience</h2>
                                        <p className="text-gray-500 text-sm">Your review will be published after our team approves it.</p>
                                    </div>

                                    {reviewSuccess ? (
                                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 text-center text-green-700 dark:text-green-400 font-medium">
                                            {reviewSuccess}
                                        </div>
                                    ) : (
                                        <form onSubmit={handleReviewSubmit} className="space-y-6">
                                            <div className="text-center space-y-2">
                                                <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Rating</p>
                                                <StarRating value={reviewRating} onChange={setReviewRating} size={36} />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Name *</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={reviewName}
                                                        onChange={e => setReviewName(e.target.value)}
                                                        placeholder="Your name"
                                                        className="w-full px-5 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Role</label>
                                                    <input
                                                        type="text"
                                                        value={reviewRole}
                                                        onChange={e => setReviewRole(e.target.value)}
                                                        placeholder="e.g. Homemaker"
                                                        className="w-full px-5 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Your Review *</label>
                                                <textarea
                                                    required
                                                    rows={4}
                                                    value={reviewContent}
                                                    onChange={e => setReviewContent(e.target.value)}
                                                    placeholder="Tell us about your experience with Eatsee Foods..."
                                                    className="w-full px-5 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white resize-none"
                                                />
                                            </div>

                                            {reviewError && <p className="text-red-500 text-sm text-center">{reviewError}</p>}

                                            <button
                                                type="submit"
                                                disabled={reviewLoading}
                                                className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all disabled:opacity-50"
                                            >
                                                {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* ── OWNER TAB ── */}
                        {activeTab === 'owner' && (
                            <motion.div key="owner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                {!isOwner ? (
                                    <div className="max-w-sm mx-auto bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] p-10 border border-gray-100 dark:border-zinc-800 shadow-xl space-y-6">
                                        <div className="text-center space-y-2">
                                            <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto">
                                                <Lock size={28} className="text-gray-500" />
                                            </div>
                                            <h2 className="text-xl font-bold dark:text-white">Owner Access</h2>
                                            <p className="text-gray-500 text-sm">Enter your owner key to manage the gallery.</p>
                                        </div>
                                        <input
                                            type="password"
                                            value={ownerKeyInput}
                                            onChange={e => setOwnerKeyInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleOwnerLogin()}
                                            placeholder="Enter owner key"
                                            className="w-full px-5 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                        />
                                        {ownerLoginError && <p className="text-red-500 text-sm text-center">{ownerLoginError}</p>}
                                        <button
                                            onClick={handleOwnerLogin}
                                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all"
                                        >
                                            Login as Owner
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-10">
                                        {/* Owner Upload */}
                                        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-zinc-800 space-y-6">
                                            <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                                                <Plus size={20} className="text-primary" /> Add Photo to Gallery
                                            </h3>
                                            <form onSubmit={handleOwnerUpload} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <label className="cursor-pointer">
                                                    <div className={`border-2 border-dashed rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center transition-all ${ownerUploadPreview ? 'border-primary' : 'border-gray-200 dark:border-zinc-700 hover:border-primary'}`}>
                                                        {ownerUploadPreview ? (
                                                            <img src={ownerUploadPreview} alt="Preview" className="max-h-32 rounded-lg object-cover" />
                                                        ) : (
                                                            <>
                                                                <Upload size={28} className="text-gray-300 mb-2" />
                                                                <span className="text-xs text-gray-400">Click to upload</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, true)} />
                                                </label>
                                                <div className="md:col-span-2 space-y-4">
                                                    <input
                                                        type="text"
                                                        value={ownerUploadTitle}
                                                        onChange={e => setOwnerUploadTitle(e.target.value)}
                                                        placeholder="Photo title"
                                                        className="w-full px-4 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                                    />
                                                    <select
                                                        value={ownerUploadType}
                                                        onChange={e => setOwnerUploadType(e.target.value)}
                                                        className="w-full px-4 py-3 bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-zinc-700 outline-none focus:border-primary dark:text-white"
                                                    >
                                                        {['Food', 'Production', 'Delivery'].map(t => <option key={t}>{t}</option>)}
                                                    </select>
                                                    <button type="submit" disabled={!ownerUploadFile || uploadLoading} className="w-full py-3 bg-primary text-white font-bold rounded-xl disabled:opacity-50 hover:bg-primary-dark transition-all">
                                                        {uploadLoading ? 'Uploading...' : 'Add to Gallery'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Pending Photos */}
                                        {pendingItems.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
                                                    <Camera size={18} className="text-amber-500" />
                                                    Pending Photos ({pendingItems.length})
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {pendingItems.map(item => (
                                                        <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-amber-200 dark:border-amber-800/40 shadow-sm">
                                                            <div className="aspect-video">
                                                                <img src={getImageSrc(item)} alt={item.title} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="p-4 space-y-3">
                                                                <p className="font-bold dark:text-white text-sm truncate">{item.title}</p>
                                                                <p className="text-xs text-gray-400">by {item.uploadedBy}</p>
                                                                <div className="flex gap-2">
                                                                    <button onClick={() => handleApproveGallery(item.id)} className="flex-1 py-2 bg-primary text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1">
                                                                        <Check size={14} /> Approve
                                                                    </button>
                                                                    <button onClick={() => handleDeleteGallery(item.id)} className="py-2 px-3 bg-red-50 dark:bg-red-900/20 text-red-500 text-xs font-bold rounded-lg">
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Pending Reviews */}
                                        {pendingReviews.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
                                                    <Star size={18} className="text-amber-500" />
                                                    Pending Reviews ({pendingReviews.length})
                                                </h3>
                                                <div className="space-y-3">
                                                    {pendingReviews.map(review => (
                                                        <div key={review.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-amber-200 dark:border-amber-800/40 flex gap-4 items-start">
                                                            <div className="flex-1 space-y-2">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="font-bold dark:text-white text-sm">{review.name}</span>
                                                                    <span className="text-xs text-gray-400">{review.role}</span>
                                                                    <div className="flex gap-0.5">
                                                                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                                                                    </div>
                                                                </div>
                                                                <p className="text-gray-600 dark:text-gray-400 text-sm">{review.content}</p>
                                                            </div>
                                                            <div className="flex gap-2 shrink-0">
                                                                <button onClick={() => handleApproveReview(review.id)} className="p-2 bg-primary text-white rounded-lg">
                                                                    <Check size={16} />
                                                                </button>
                                                                <button onClick={() => handleDeleteReview(review.id)} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {pendingItems.length === 0 && pendingReviews.length === 0 && (
                                            <div className="text-center py-12 text-gray-400">
                                                <Check size={48} className="mx-auto mb-3 text-green-400" />
                                                <p className="font-medium">All clear! No pending items.</p>
                                            </div>
                                        )}

                                        <button onClick={() => { setIsOwner(false); setOwnerKey(''); setActiveTab('gallery'); }} className="text-sm text-gray-400 hover:text-red-500 transition-colors">
                                            Logout from owner panel
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-10 right-10 text-white hover:text-primary transition-colors z-10">
                            <X size={48} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.85 }}
                            className="max-w-5xl w-full max-h-[85vh] bg-zinc-900 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex-1 overflow-hidden">
                                <img src={getImageSrc(selectedImage)} alt={selectedImage.title} className="w-full h-full object-contain md:object-cover" />
                            </div>
                            <div className="w-full md:w-80 p-10 flex flex-col justify-center gap-6 bg-zinc-900 text-white shrink-0">
                                <span className="text-primary font-bold uppercase tracking-widest text-xs">{selectedImage.type}</span>
                                <h3 className="text-3xl font-playfair font-bold">{selectedImage.title}</h3>
                                {selectedImage.uploadedBy && selectedImage.uploadedBy !== 'owner' && (
                                    <p className="text-gray-400 text-sm">Shared by {selectedImage.uploadedBy}</p>
                                )}
                                <p className="text-gray-400 text-sm italic">Eatsee Foods, Omassery, Kerala</p>
                                <div className="pt-6 border-t border-zinc-800">
                                    <button onClick={() => setSelectedImage(null)} className="w-full py-4 bg-white text-black font-bold rounded-xl active:scale-95 transition-all">
                                        Close View
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
