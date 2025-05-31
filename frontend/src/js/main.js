import renderHome from './pages/home.js';

window.showHome = function () {
  document.getElementById('home-section').style.display = 'block';
  document.getElementById('contact-section').style.display = 'none';
  // Hide other sections as needed
};

window.showProducts = function (category) {
  // Implement showing products by category
  console.log('Show products for category:', category);
};

window.showContact = function () {
  document.getElementById('contact-section').style.display = 'block';
  document.getElementById('home-section').style.display = 'none';
  // Hide other sections as needed
};

window.showTrackOrder = function () {
  document.getElementById('track-order-section').style.display = 'block';
  // Hide other sections as needed
};

window.showLogin = function () {
  document.getElementById('login-section').style.display = 'block';
  // Hide other sections as needed
};

window.showAdmin = function () {
  document.getElementById('admin-section').style.display = 'block';
  // Hide other sections as needed
};

window.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('App container with id "app" not found.');
    return;
  }
  renderHome(); // Load homepage on launch
});
