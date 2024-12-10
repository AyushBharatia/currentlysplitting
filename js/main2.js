"use strict";
var isValid = true;
var globalUsername; // Global variable to store the username

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const processLogin = () => {
    const loginButton = $("#login");
    const registerButton = $("#register");
    const loginForm = $(".login-form");
    const registerForm = $(".register-form");

    loginButton.style.backgroundColor = "#6A37FF";
    registerButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    loginForm.style.left = "50%";
    registerForm.style.left = "-50%";
    loginForm.style.opacity = 1;
    registerForm.style.opacity = 0;
    loginForm.style.pointerEvents = "auto";
    registerForm.style.pointerEvents = "none";
};

const processRegister = () => {
    const loginButton = $("#login");
    const registerButton = $("#register");
    const loginForm = $(".login-form");
    const registerForm = $(".register-form");

    loginButton.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    registerButton.style.backgroundColor = "#6A37FF";
    loginForm.style.left = "-50%";
    registerForm.style.left = "50%";
    loginForm.style.opacity = 0;
    registerForm.style.opacity = 1;
    loginForm.style.pointerEvents = "none";
    registerForm.style.pointerEvents = "auto";
};

const invalidEntry = (selector) => {
    const inputField = $(selector);
    if (!inputField) return; // Ensure the element exists
    const inputFieldValue = inputField.value;
    const errorIcon = $(`${selector}-error-icon`);
    const errorMessageElement = $(`${selector}-error`);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (inputFieldValue == "") {
        inputField.style.border = "2px solid rgba(228, 77, 38, 1)";
        inputField.style.boxShadow = "0 0 0 3.5px rgba(228, 77, 38, 0.3)";
        errorIcon.style.display = "block";
        errorMessageElement.textContent = "Required";
        isValid = false; // Mark as invalid
    } else if (selector === "#registerEmail" && !emailPattern.test(inputField.value)) {
        inputField.style.border = "2px solid rgba(228, 77, 38, 1)";
        inputField.style.boxShadow = "0 0 0 3.5px rgba(228, 77, 38, 0.3)";
        errorIcon.style.display = "block";
        errorMessageElement.textContent = "Enter a Valid Email Address";
        isValid = false; // Mark as invalid
    }
};

const clearAllErrors = () => {
    const inputs = document.querySelectorAll(".input-field");

    inputs.forEach((input) => {
        const errorIcon = document.querySelector(`#${input.id}-error-icon`);
        const errorMessageElement = document.querySelector(`#${input.id}-error`);

        // Reset styles for inputs and errors
        input.style.border = "";
        input.style.boxShadow = "";
        errorIcon.style.display = "none";
        errorMessageElement.textContent = "";
    });
};

const validateFormLogIn = (evt) => {
    isValid = true; // Reset isValid for login form validation
    invalidEntry("#username");
    invalidEntry("#password");

    if (!isValid) {
        evt.preventDefault(); // Prevent form submission if validation fails
    } else {
        // Prevent default form submission
        evt.preventDefault();

        // Store the username for personalization
        globalUsername = $("#username").value;

        // Save the username in localStorage
        localStorage.setItem("username", globalUsername);

        // Redirect to index.html after successful login
        window.location.href = "index.html";
    }
};


const validateFormSignUp = (evt) => {
    isValid = true; // Reset isValid for signup form validation
    invalidEntry("#registerEmail");
    invalidEntry("#registerUsername");
    invalidEntry("#registerPassword");

    if (!isValid) {
        evt.preventDefault(); // Prevent form submission if any error is present
    }
};

const updateUsernameOnHomePage = () => {
    // Check if username exists in localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        const userElement = $(".user a"); // Select the user element
        userElement.innerHTML = `<i class="material-icons">person</i>${storedUsername}`;
    }
};

const setUpListeners = () => {
    // Handle focus and input for both login and register forms
    const inputs = document.querySelectorAll(".input-field");

    inputs.forEach((input) => {
        input.addEventListener("focus", () => {
            clearAllErrors(); // Clear errors when focus is triggered
        });

        input.addEventListener("input", () => {
            clearAllErrors(); // Clear errors on input
        });
    });
};


const fetchTripSuggestions = async () => {
    try {
        console.log("Fetching trip suggestions...");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated network delay
        const suggestions = [
            { name: "Paris Getaway", location: "Paris, France", duration: "3 days" },
            { name: "Tropical Escape", location: "Bali, Indonesia", duration: "7 days" },
            { name: "Adventure Trek", location: "Machu Picchu, Peru", duration: "5 days" },
        ];
        displayTripSuggestions(suggestions);
    } catch (error) {
        console.error("Error fetching trip suggestions:", error);
        showErrorPopup("Failed to load trip suggestions. Please try again later.");
    }
};

const displayTripSuggestions = (suggestions) => {
    const suggestionsContainer = document.querySelector("#suggested-trips");
    suggestionsContainer.innerHTML = suggestions
        .map(
            (trip) => `
            <div class="suggestion-card">
                <h3>${trip.name}</h3>
                <p>Location: ${trip.location}</p>
                <p>Duration: ${trip.duration}</p>
            </div>
        `
        )
        .join("");
};

document.addEventListener("DOMContentLoaded", () => {
    // Set up listeners for the login/registration form
    setUpListeners();
    if ($("#login")) $("#login").addEventListener("click", processLogin);
    if ($("#register")) $("#register").addEventListener("click", processRegister);
    if ($(".login-form")) $(".login-form").addEventListener("submit", validateFormLogIn);
    if ($(".register-form"))
        $(".register-form").addEventListener("submit", validateFormSignUp);

    fetchTripSuggestions(); 



    // Update username on home page
    updateUsernameOnHomePage();
    
    
});












