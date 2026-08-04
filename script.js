const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const modal = document.getElementById('paymentModal');
const modalProduct = document.getElementById('modalProduct');

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', event => {
    const href = button.getAttribute('href');
    if (!href || href === '#') {
      event.preventDefault();
      modalProduct.textContent = button.dataset.product;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.modal-close, .modal-close-secondary, .modal-backdrop')
  .forEach(el => el.addEventListener('click', closeModal));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

document.getElementById('year').textContent = new Date().getFullYear();
