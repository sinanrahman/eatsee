const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API = {
    // Gallery
    getGallery: (type = 'All', role = '') =>
        fetch(`${BASE_URL}/api/gallery?type=${type}&role=${role}`, { cache: 'no-store' }).then(r => r.json()),

    uploadOwnerPhoto: (formData) =>
        fetch(`${BASE_URL}/api/gallery/owner`, { method: 'POST', body: formData }).then(r => r.json()),

    uploadCustomerPhoto: (formData) =>
        fetch(`${BASE_URL}/api/gallery/customer`, { method: 'POST', body: formData }).then(r => r.json()),

    approveGalleryItem: (id, ownerKey) =>
        fetch(`${BASE_URL}/api/gallery/${id}/approve`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerKey })
        }).then(r => r.json()),

    deleteGalleryItem: (id, ownerKey) =>
        fetch(`${BASE_URL}/api/gallery/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerKey })
        }).then(r => r.json()),

    // Reviews
    getReviews: (role = '') =>
        fetch(`${BASE_URL}/api/reviews?role=${role}`, { cache: 'no-store' }).then(r => r.json()),

    submitReview: (data) =>
        fetch(`${BASE_URL}/api/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(r => r.json()),

    approveReview: (id, ownerKey) =>
        fetch(`${BASE_URL}/api/reviews/${id}/approve`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerKey })
        }).then(r => r.json()),

    deleteReview: (id, ownerKey) =>
        fetch(`${BASE_URL}/api/reviews/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ownerKey })
        }).then(r => r.json()),

    getImageUrl: (path) => `${BASE_URL}${path}`,
};
