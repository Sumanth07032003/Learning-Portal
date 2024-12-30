// User credentials
const VALID_USERNAME = "user";
const VALID_PASSWORD = "password";

// DOM Elements
const loginContainer = document.getElementById("login-container");
const videoContainer = document.getElementById("video-container");
const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

// Handle login form submission
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get entered username and password
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate credentials
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // Hide login container and show video
    loginContainer.style.display = "none";
    videoContainer.style.display = "block";
  } else {
    // Show error message
    errorMessage.textContent = "Invalid username or password!";
  }
});
