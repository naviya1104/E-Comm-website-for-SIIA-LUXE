export default function showModal(message) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(modal);
}
