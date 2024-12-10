"use strict";

// Query Selectors
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Variables
var tripData = {};
var currentState = 0;
let modal, modalDetails, modalConfirm, closeButton, selectedTripCard;

// Navigation Functions
const tripPage = () => {
    tripData = {};
    currentState = 0;
    window.location.href = "addTrip.html";
};

const userTripPage = () => {
    window.location.href = "userTrips.html";
};

// Reset Form
const resetForm = () => {
    currentState = 0;
    tripData = {};
    const steps = [
        {
            questionHeading: "Let's Start with a Name!",
            questionDescription: "What would you like to call this trip? Choose a name that captures the excitement or purpose of your journey.",  
            legend: "Trip Name",
            nextButton: "Next",
            inputType: "text",
            inputPlaceholder: "E.g., Summer Escape, Work Retreat",
            inputKey: "tripName",
        }
    ];
    updateForm(steps[currentState]);
};

// Save Input
const saveInput = (key) => {
    const inputField = $("#dynamic-input");
    const errorMsg = $(".error-message");
    if (inputField && inputField.value.trim()) {
        tripData[key] = inputField.value.trim();
        errorMsg.textContent = ""; // Clear error message
        return true;
    } else {
        errorMsg.textContent = "Please fill out this field."; // Show error message
        return false;
    }
};

// Change Text
const updateForm = ({ questionHeading, questionDescription, legend, nextButton, inputType, inputPlaceholder }) => {
    $(".heading p").textContent = questionHeading;
    $(".question p").textContent = questionDescription;
    $(".legend").textContent = legend;
    $(".submit").textContent = nextButton;

    const inputField = $("#dynamic-input");
    if (inputField) {
        inputField.type = inputType;
        inputField.placeholder = inputPlaceholder;
        inputField.value = "";
    }
};

// Save Form
const saveForm = (event) => {
    if (event) event.preventDefault(); // Prevent default form submission
    const steps = [
        {
            questionHeading: "Let's Start with a Name!",
            questionDescription: "What would you like to call this trip? Choose a name that captures the excitement or purpose of your journey.",
            legend: "Trip Name:",
            nextButton: "Next",
            inputType: "text",
            inputPlaceholder: "E.g., Summer Escape, Work Retreat",
            inputKey: "tripName",
        },
        {
            questionHeading: "Where Are You Headed?",
            questionDescription: "Tell us the destination for your adventure. Whether it's a city, a beach, or a remote hideaway, we’d love to know!",
            legend: "Destination",
            nextButton: "Next",
            inputType: "text",
            inputPlaceholder: "E.g., Paris, Bali, Yosemite",
            inputKey: "destination",
        },
        {
            questionHeading: "When Does the Adventure Begin?",
            questionDescription: "Let us know your arrival date so we can keep track of your plans.",
            legend: "Arrival Date",
            nextButton: "Next",
            inputType: "date",
            inputPlaceholder: "",
            inputKey: "arrivalDate",
        },
        {
            questionHeading: "When Will You Return?",
            questionDescription: "Share your departure date to help us complete the trip timeline.",
            legend: "Departure Date",
            nextButton: "Finish",
            inputType: "date",
            inputPlaceholder: "",
            inputKey: "departureDate",
        },
    ];

    const currentStep = steps[currentState];
    if (saveInput(currentStep.inputKey)) {
        if (currentState < steps.length - 1) {
            currentState++;
            updateForm(steps[currentState]);
        } else if (currentState === steps.length - 1) {
            const validDates = validateDates();
            if (validDates) {
                saveInput("departureDate");
                departureToSubmit();
            }
        }
    }
};

// Validate Dates
const validateDates = () => {
    const arrivalDate = new Date(tripData.arrivalDate);
    const departureDate = new Date(tripData.departureDate);
    const errorMsg = $(".error-message");

    if (arrivalDate >= departureDate) {
        errorMsg.textContent = "Departure date must be after arrival date.";
        return false;
    }
    return true;
};

// Submit Trip Data
const departureToSubmit = () => {
    const days = Math.ceil(
        (new Date(tripData.departureDate) - new Date(tripData.arrivalDate)) / (1000 * 60 * 60 * 24)
    );

    const newTrip = {
        imageSrc: "../images/randombg1.jpg",
        title: tripData.tripName,
        days,
        location: tripData.destination,
    };

    lsadd("trips", newTrip);
    resetForm();
    window.location.href = "userTrips.html";
};

// Add Trip to Local Storage
const lsadd = (storage_name, value) => {
    let tripStorage_list = JSON.parse(localStorage.getItem(storage_name)) || [];
    tripStorage_list.push(value);
    console.log(tripStorage_list);
    localStorage.setItem(storage_name, JSON.stringify(tripStorage_list));
};

// Delete Trip from Local Storage
const lsdel = (storage_name, tripTitleToDelete) => {
    let ls_data = JSON.parse(localStorage.getItem(storage_name)) || [];
    
    // Filter out the trip to delete
    ls_data = ls_data.filter(trip => trip.title !== tripTitleToDelete);

    localStorage.setItem(storage_name, JSON.stringify(ls_data));
    console.log(ls_data);
    console.log(storage_name);
    console.log(tripTitleToDelete);
};

// Load Trips
const loadTrips = () => {
    const savedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const tripList = $(".trip-list");
    tripList.innerHTML = "";

    savedTrips.forEach((trip) => {
        const tripCard = document.createElement("li");
        tripCard.classList.add("trip-card");
        tripCard.innerHTML = `
            <div class="trip-image">
                <img src="${trip.imageSrc}" alt="Trip Image" class="randomimage">
            </div>
            <div class="trip-content">
                <h3 class="tripcard-title">${trip.title}</h3>
                <div class="icon-stuff">
                    <p class="center-content">
                        <span class="days-icon">
                            <ion-icon name="today-outline"></ion-icon>
                            <span class="text">${trip.days} days</span>
                        </span>
                        <span class="location-icon">
                            <ion-icon name="location-outline"></ion-icon>
                            <span class="text1">${trip.location}</span>
                        </span>
                    </p>
                </div>
            </div>
        `;
        tripList.appendChild(tripCard);

        tripCard.addEventListener("click", () => {
            selectedTripCard = tripCard;
            modalDetails.textContent = `Do you want to delete the trip: ${trip.title}?`;
            modal.classList.remove("hidden");
        });
    });
};

// Close Modal
const closeModal = () => {
    modal.classList.add("hidden");
    selectedTripCard = null;
};

// Delete Trip
const deleteTripCard = () => {
    if (selectedTripCard) {
        const tripTitleToDelete = selectedTripCard.querySelector(".tripcard-title").textContent.trim();
        console.log(tripTitleToDelete + "lalalala");
        lsdel("trips", tripTitleToDelete);
        selectedTripCard.remove();
    }
    closeModal();
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    let path = window.location.pathname;

    if (path.includes("planner.html")) {
        $("#saved-trip").addEventListener("click", userTripPage);
        $("#switch-layout").addEventListener("click", tripPage);
    }

    if (path.includes("userTrips.html")) {
        loadTrips();
        modal = $("#modal");
        modalDetails = $("#modal-details");
        modalConfirm = $("#modal-confirm");
        closeButton = $(".modal-close");

        modalConfirm.addEventListener("click", deleteTripCard);
        closeButton.addEventListener("click", closeModal);
        modal.addEventListener("click", (event) => {
            if (event.target.classList.contains("modal-close") || event.target.classList.contains("modal-overlay")) {
                closeModal();
            }
        });

        $(".add-new").addEventListener("click",tripPage)
    }

    if (path.includes("addTrip.html")) {
        const tripForm = $("#trip-form");
        tripForm.addEventListener("submit", saveForm);
        $(".submit").addEventListener("click", saveForm);

        // Handle Enter key press
        $("#dynamic-input").addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                saveForm(event);
            }
        });
    }

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});

