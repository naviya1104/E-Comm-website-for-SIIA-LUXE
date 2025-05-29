import { renderHeader, renderFooter } from '../components/navigation.js';

export default function renderAuth() {
  document.getElementById('app').innerHTML = `
    ${renderHeader()}
    <section class="login-section" id="login-section">
      <div class="container">
        <h2 class="section-title">Login / Signup</h2>
        <div class="auth-tabs">
          <button id="login-tab" class="btn" onclick="toggleForm('login')">Login</button>
          <button id="signup-tab" onclick="toggleForm('signup')">Signup</button>
        </div>
        <div id="login-form" class="auth-form">...</div>
        <div id="signup-form" class="auth-form" style="display:none;">...</div>
        <button onclick="renderHome()" class="btn">← Back to Home</button>
      </div>
    </section>
    ${renderFooter()}
  `;

  window.toggleForm = (type) => {
    document.getElementById('login-form').style.display = type === 'login' ? 'block' : 'none';
    document.getElementById('signup-form').style.display = type === 'signup' ? 'block' : 'none';
  };
}  
