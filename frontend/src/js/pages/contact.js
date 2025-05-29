import { renderHeader, renderFooter } from '../components/navigation.js';

export default function renderContact() {
  document.getElementById('app').innerHTML = `
    ${renderHeader()}
    <section class="contact-section" id="contact-section">
      <div class="container">
        <h2 class="section-title">Contact Us</h2>
        <div class="contact-wrapper">
          <div class="contact-info">
            <h3>Get in Touch</h3>
            <p><strong>📧 Email:</strong> info@siialuxe.com</p>
            <p><strong>📞 Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>📍 Address:</strong> 123 Luxury Ave, Fashion District, NY 10001</p>
            <p><strong>🕒 Hours:</strong> Mon-Fri 9AM-6PM, Sat 10AM-4PM</p>
          </div>
          <div class="contact-form">
            <h3>Send Message</h3>
            <form>
              <input type="text" placeholder="Your Name">
              <input type="email" placeholder="Your Email">
              <textarea placeholder="Your Message"></textarea>
              <button type="submit" class="btn">Send Message</button>
            </form>
          </div>
        </div>
        <button onclick="renderHome()" class="btn">← Back to Home</button>
      </div>
    </section>
    ${renderFooter()}
  `;
}
