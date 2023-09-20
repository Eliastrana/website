const imageUrls = [
  'photos/fridglassdome.jpeg',
  'photos/imm016_N16.jpeg',
  'photos/DSCF7107.JPG',
  'photos/DSCF4302.JPG',
  'photos/statuedanmark.jpeg',
  'photos/DSCF4325.JPG',
  'photos/DSCF5050.JPG',
  'photos/badeklipp.jpeg',
  'photos/outfit.jpeg',
  'photos/lacrossePortrait.jpeg',
  'photos/imm001_N1.jpeg'

  // Add more image URLs here
];

const imageGrid = document.querySelector('.image-grid');

function setGridHeight() {
  const imageGrid = document.querySelector('.image-grid');
  const windowHeight = window.innerHeight;
  const signatureHeight = document.querySelector('.signature').offsetHeight;
  imageGrid.style.height = `${windowHeight - signatureHeight}px`;
}

// Call the function initially to set the height
setGridHeight();

// Re-call the function on window resize to adjust the height dynamically
window.addEventListener('resize', setGridHeight);

// Loop through the imageUrls array and create image elements for each URL
imageUrls.forEach((imageUrl) => {
  const img = document.createElement('img');
  img.src = imageUrl;
  img.onclick = () => showImageInOverlay(img.src);
  imageGrid.appendChild(img);
});

function showImageInOverlay(imageUrl) {
  const fullImage = document.getElementById('fullImage');
  const overlay = document.getElementById('overlay');
  fullImage.src = imageUrl;
  overlay.style.display = 'flex'; // Display overlay as a flex container to align the arrows
  currentIndex = imageUrls.indexOf(imageUrl);
  updateArrowsVisibility();

  // Hide the signature when showing overlay
  document.getElementById('signature').classList.add('hidden');
}

function closeOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';

  // Show the signature when closing overlay
  document.getElementById('signature').classList.remove('hidden');
}

let currentIndex = 0;

function prevImage() {
  if (currentIndex > 0) {
    currentIndex--;
    showImageInOverlay(imageUrls[currentIndex]);
  }
}

function nextImage() {
  if (currentIndex < imageUrls.length - 1) {
    currentIndex++;
    showImageInOverlay(imageUrls[currentIndex]);
  }
}

function updateArrowsVisibility() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
  nextBtn.style.display = currentIndex === imageUrls.length - 1 ? 'none' : 'block';
}

// Using Intersection Observer to toggle the visibility of the signature
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5, // Adjust the threshold value to your preference
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.getElementById('signature').classList.remove('hidden');
    } else {
      document.getElementById('signature').classList.add('hidden');
    }
  });
}, options);

observer.observe(document.querySelector('.image-grid'));
