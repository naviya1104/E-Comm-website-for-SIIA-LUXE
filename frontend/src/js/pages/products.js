import { renderHeader, renderFooter } from '../components/navigation.js';

export default function renderProducts(category = 'all') {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  document.getElementById('app').innerHTML = `
    ${renderHeader()}
    <section class="products-section" id="products-section">
      <div class="container">
        <h2 class="section-title" id="products-title">${category[0].toUpperCase() + category.slice(1)}</h2>
        <button onclick="renderHome()" class="btn" style="margin-bottom: 2rem;">← Back to Home</button>
        <div class="products-grid">
          ${filtered.map(p => `
            <div class="product-card">
              <div class="product-image">${p.image ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;">` : '📿'}</div>
              <div class="product-info">
                <h4>${p.name}</h4>
                <div class="product-price">$${p.price}</div>
                <p>${p.description}</p>
                <button class="btn" style="width:100%; margin-top:1rem;">Add to Cart</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    ${renderFooter()}
  `;
}