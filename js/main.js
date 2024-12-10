$(document).ready(function() {
    const reviews = [
        { name: "John Doe", review: "Amazing service! Highly recommend.", profile: "https://via.placeholder.com/50", rating: 5 },
        { name: "Jane Smith", review: "Helped me plan my trip effortlessly.", profile: "https://via.placeholder.com/50", rating: 4 },
        { name: "Sam Wilson", review: "Great features and easy to use.", profile: "https://via.placeholder.com/50", rating: 4 },
        { name: "Alice Johnson", review: "Very user-friendly and efficient.", profile: "https://via.placeholder.com/50", rating: 5 },
        { name: "Bob Brown", review: "A must-have for travelers.", profile: "https://via.placeholder.com/50", rating: 5 }
    ];

    let currentIndex = 0;

    const showReviews = () => {
        const $gallery = $(".review-gallery");
        $gallery.empty(); // Clear the gallery

        // Show 3 reviews at a time
        for (let i = 0; i < 3; i++) {
            const reviewIndex = (currentIndex + i) % reviews.length;
            const review = reviews[reviewIndex];

            const $reviewCard = $("<div>").addClass("review-card").html(`
                <img src="../images/download.png" alt="${review.name}" class="profile-icon" width="50px">
                <p class="review-text">"${review.review}"</p>
                <div class="star-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p class="review-author">- ${review.name}</p>
            `);

            $gallery.append($reviewCard);
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

    // Initial display of reviews
    showReviews();

    // Event listeners for next and previous buttons
    $(".next").on("click", showNextReviews);
    $(".prev").on("click", showPreviousReviews);

    // Mobile menu toggle
    $(document).ready(function () {
        $('.menu-icon').on('click', function () {
            $('.mobile-buttons').toggleClass('active');
        });
    });
});