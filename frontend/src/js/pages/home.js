import { renderHeader, renderFooter } from '../components/navigation.js';
import renderSlideshow from '../components/slideshow.js';

export default function renderHome() {
  document.getElementById('app').innerHTML = `
    ${renderHeader()}
    ${renderSlideshow()}
    <section class="vision-section" id="vision-section">
      <div class="container">
        <div class="vision-content">
          <h2 class="vision-title">Our Vision</h2>
          <p class="vision-text" id="vision-text">
            At SIIA LUXE JEWELS, we envision a world where elegance meets innovation. Our commitment to creating anti-tarnish jewelry stems from our belief that beauty should be eternal. Every piece we craft tells a story of timeless sophistication, designed to accompany you through life's most precious moments while maintaining its radiant allure for generations to come.
          </p>
        </div>
      </div>
    </section>
    <section class="categories-section" id="categories">
      <div class="container">
        <h2 class="section-title">Our Exquisite Collections</h2>
        <div class="categories-grid">
          <div class="category-card" onclick="showProducts('necklaces')">
            <div class="category-image">💎</div>
            <div class="category-info">
              <h3>Necklaces</h3>
              <p>Elegant statement pieces and delicate chains</p>
            </div>
          </div>
          <div class="category-card" onclick="showProducts('earrings')">
            <div class="category-image">✨</div>
            <div class="category-info">
              <h3>Earrings</h3>
              <p>From subtle studs to dramatic drops</p>
            </div>
          </div>
          <div class="category-card" onclick="showProducts('bracelets')">
            <div class="category-image">🌟</div>
            <div class="category-info">
              <h3>Bracelets</h3>
              <p>Sophisticated wrist accessories</p>
            </div>
          </div>
          <div class="category-card" onclick="showProducts('rings')">
            <div class="category-image">💍</div>
            <div class="category-info">
              <h3>Rings</h3>
              <p>Timeless symbols of elegance</p>
            </div>
          </div>
          <div class="category-card" onclick="showProducts('sets')">
            <div class="category-image">👑</div>
            <div class="category-info">
              <h3>Jewelry Sets</h3>
              <p>Complete coordinated collections</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${renderFooter()}
  `;
}