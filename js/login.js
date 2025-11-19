// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const loginButton = document.getElementById('loginButton');
const popupOverlay = document.getElementById('popupOverlay');
const popupIcon = document.getElementById('popupIcon');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');
const popupClose = document.getElementById('popupClose');

// Password Toggle Functionality
passwordToggle.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(input, message) {
    const errorDiv = input.parentElement.querySelector('.error-message') || document.createElement('div');
    if (!input.parentElement.querySelector('.error-message')) {
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    input.style.borderColor = '#ff6b6b';
}

function clearError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.classList.remove('show');
    }
    input.style.borderColor = '#2a2a2a';
}

// Real-time Validation
emailInput.addEventListener('input', function () {
    if (this.value.trim() === '') {
        clearError(this);
    } else if (!validateEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    } else {
        clearError(this);
    }
});

passwordInput.addEventListener('input', function () {
    if (this.value === '') {
        clearError(this);
    } else if (!validatePassword(this.value)) {
        showError(this, 'Password must be at least 6 characters long');
    } else {
        clearError(this);
    }
});

// Show Popup Function
function showPopup(type, title, message) {
    // Reset popup classes
    popupOverlay.className = 'popup-overlay';

    if (type === 'success') {
        popupIcon.textContent = '✅';
        popupOverlay.classList.add('popup-success');
    } else {
        popupIcon.textContent = '❌';
        popupOverlay.classList.add('popup-error');
    }

    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popupOverlay.classList.add('active');
}

// Close Popup Function
function closePopup() {
    popupOverlay.classList.remove('active');
}

// Popup Event Listeners
popupClose.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', function (e) {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Form Submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let isValid = true;

    // Validate email
    if (!email) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError(passwordInput, 'Password must be at least 6 characters long');
        isValid = false;
    }

    if (isValid) {
        // Simulate login process
        loginButton.disabled = true;
        loginButton.classList.add('loading');
        loginButton.textContent = '';

        // Simulate API call delay
        setTimeout(() => {
            // Simple demo logic - you can modify this
            const demoEmail = 'demo@example.com';
            const demoPassword = 'password123';

            if (email === demoEmail && password === demoPassword) {
                showPopup('success', 'Login Successful', 'Welcome back to Mountaineer!');
            } else {
                showPopup('error', 'Login Failed', 'Invalid email or password. Try: demo@example.com / password123');
            }

            // Reset button
            loginButton.disabled = false;
            loginButton.classList.remove('loading');
            loginButton.textContent = 'Login';

        }, 1500);
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function () {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Add placeholder attributes for floating labels
    emailInput.setAttribute('placeholder', ' ');
    passwordInput.setAttribute('placeholder', ' ');
});
