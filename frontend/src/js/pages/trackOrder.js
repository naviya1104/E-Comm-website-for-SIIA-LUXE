import { renderHeader, renderFooter } from '../components/navigation.js';

export default function renderTrackOrder() {
  document.getElementById('app').innerHTML = `
    ${renderHeader()}
    <section class="track-order-section" id="track-order-section">
      <div class="container">
        <h2 class="section-title">Track Your Order</h2>
        <form class="track-form">
          <label for="order-id">Enter Order ID:</label>
          <input type="text" id="order-id" placeholder="e.g. ORD123456">
          <button type="submit" class="btn">Track</button>
        </form>
        <div class="order-status" id="order-status"></div>
        <button onclick="renderHome()" class="btn">← Back to Home</button>
      </div>
    </section>
    ${renderFooter()}
  `;

  document.querySelector('.track-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const orderId = document.getElementById('order-id').value;
    document.getElementById('order-status').innerHTML = `<p>Tracking order: <strong>${orderId}</strong>...</p>`;
  });
}