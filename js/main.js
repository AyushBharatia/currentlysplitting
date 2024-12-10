"use strict";

const $ = (selector) => document.querySelector(selector);

const reviews = [
    { name: "John Doe", review: "Amazing service! Highly recommend.", profile: "https://via.placeholder.com/50", rating: 5 },
    { name: "Jane Smith", review: "Helped me plan my trip effortlessly.", profile: "https://via.placeholder.com/50", rating: 4 },
    { name: "Sam Wilson", review: "Great features and easy to use.", profile: "https://via.placeholder.com/50", rating: 4 },
    { name: "Alice Johnson", review: "Very user-friendly and efficient.", profile: "https://via.placeholder.com/50", rating: 5 },
    { name: "Bob Brown", review: "A must-have for travelers.", profile: "https://via.placeholder.com/50", rating: 5 }
];

let currentIndex = 0;

const showReviews = () => {
    const gallery = $(".review-gallery");
    gallery.innerHTML = ""; // Clear the gallery

    // Show 3 reviews at a time
    for (let i = 0; i < 3; i++) {
        const reviewIndex = (currentIndex + i) % reviews.length;
        const review = reviews[reviewIndex];

        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        reviewCard.innerHTML = `
            <img src="${review.profile}" alt="${review.name}" class="profile-icon">
            <p class="review-text">"${review.review}"</p>
            <div class="star-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="review-author">- ${review.name}</p>
        `;
        gallery.appendChild(reviewCard);
    }
};

const showNextReviews = () => {
    currentIndex = (currentIndex + 3) % reviews.length;
    showReviews();
};

const showPreviousReviews = () => {
    currentIndex = (currentIndex - 3 + reviews.length) % reviews.length;
    showReviews();
};

document.addEventListener("DOMContentLoaded", () => {
    showReviews();
    $(".next").addEventListener("click", showNextReviews);
    $(".prev").addEventListener("click", showPreviousReviews);
});
