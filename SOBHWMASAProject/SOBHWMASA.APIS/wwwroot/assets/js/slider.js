// slider.js
console.log('Slider script loaded');
document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".slides-container");
  const slides = slidesContainer.querySelectorAll("li");
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  let currentIndex = 0;

  if (!slidesContainer || !slides || !nextButton || !prevButton) {
    console.error('Slider elements not found');
    return;
  }

  // Function to update the slide display
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? "block" : "none";
    });
  }

  // Next button event
  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  });

  // Previous button event
  prevButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  });

  // Initialize slides display
  updateSlides();
});
