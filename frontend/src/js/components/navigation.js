// navigation.js
export function renderHeader() {
  return `
    <header>
      <nav class="container">
        <a href="#" class="logo" onclick="showHome()">SIIA LUXE</a>
        <ul class="nav-links">
          <li><a href="#" onclick="showHome()">Home</a></li>
          <li><a href="#" onclick="showProducts('all')">Shop</a></li>
          <li><a href="#" onclick="showContact()">Contact Us</a></li>
          <li><a href="#" onclick="showTrackOrder()">Track Order</a></li>
          <li><a href="#" onclick="showLogin()">Login/Signup</a></li>
          <li><a href="#" onclick="showAdmin()">Admin</a></li>
        </ul>
        <a href="#" class="cart-icon" onclick="alert('Cart functionality coming soon!')">🛒 Cart (0)</a>
      </nav>
    </header>
  `;
}

export function renderFooter() {
  return `
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>SIIA LUXE JEWELS</h3>
            <p>Premium anti-tarnish jewelry crafted with love and precision. Experience luxury that lasts.</p>
          </div>
          <div class="footer-section">
            <h3>Quick Links</h3>
            <p><a href="#" onclick="showHome()" style="color: #ccc;">Home</a></p>
            <p><a href="#" onclick="showProducts('all')" style="color: #ccc;">Collections</a></p>
            <p><a href="#" style="color: #ccc;">About Us</a></p>
          </div>
          <div class="footer-section">
            <h3>Contact Info</h3>
            <p>Email: info@siialuxe.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <p>&copy; 2025 SIIA LUXE JEWELS. All rights reserved.</p>
      </div>
    </footer>
  `;
}
