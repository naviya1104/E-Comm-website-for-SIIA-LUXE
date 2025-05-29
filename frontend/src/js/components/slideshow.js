// slideshow.js
export default function renderSlideshow() {
  return `
    <section class="hero-section" id="home-section">
      <div class="slideshow-container">
        <div class="slide active" id="slide-1"></div>
        <div class="slide" id="slide-2"></div>
        <div class="slide" id="slide-3"></div>
        <div class="dots-container">
          <span class="dot active" onclick="currentSlide(1)"></span>
          <span class="dot" onclick="currentSlide(2)"></span>
          <span class="dot" onclick="currentSlide(3)"></span>
        </div>
      </div>
    </section>
  `;
}
