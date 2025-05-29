import { renderHeader, renderFooter } from '../components/navigation.js';

export default function renderAdmin() {
  document.getElementById('app').innerHTML = `
    ${renderHeader()}
    <section class="admin-section" id="admin-section">
      <div class="container">
        <h2 class="section-title">Admin Dashboard</h2>
        <form id="add-product-form" class="admin-form">
          <input type="text" id="product-name" placeholder="Product Name">
          <input type="text" id="product-category" placeholder="Category">
          <input type="number" id="product-price" placeholder="Price">
          <input type="text" id="product-description" placeholder="Description">
          <input type="url" id="product-image" placeholder="Image URL">
          <button type="submit" class="btn">Add Product</button>
        </form>
        <div class="admin-preview" id="admin-preview"></div>
        <button onclick="renderHome()" class="btn">← Back to Home</button>
      </div>
    </section>
    ${renderFooter()}
  `;

  document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image').value;

    const product = { name, category, price, description, image };
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    alert('Product added successfully!');
  });
}