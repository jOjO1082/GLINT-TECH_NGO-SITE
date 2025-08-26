
// Mobile Toggle

const menuButton = document.getElementById('mobileMenuBtn')
const menuCloseButton = document.getElementById('closeMenuIcon')
const mobileMenu = document.getElementById('mobileMenu')

menuButton.addEventListener('click', () => {
  mobileMenu.style.display = 'flex'
}
);

menuCloseButton.addEventListener('click', () => {
  mobileMenu.style.display = 'none' 
});


// Close menu
