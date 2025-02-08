// Wait for the entire page to load
window.addEventListener("load", () => {
  // Hide the preloader
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden");

  // Show the content
  const content = document.getElementById("content");
  content.classList.remove("hidden");
});

// Side menu toggle function
function toggleMenu() {
  const menu = document.getElementById("side-menu");
  menu.classList.toggle("translate-x-full");
}

// Select all video buttons
const videoButtons = document.querySelectorAll("#videoButton");
const videoModal = document.getElementById("videoModal");
const closeButton = document.getElementById("closeButton");
const videoFrame = document.getElementById("videoFrame");
const youtubeLink = document.getElementById("youtubeLink");

// Video URLs
const youtubeURL = "https://www.youtube.com/embed/p7ZC693WJ5Q";
const youtubeWatchURL = "https://www.youtube.com/watch?v=p7ZC693WJ5Q";

// Attach event listeners to all video buttons
videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    videoFrame.src = youtubeURL; // No autoplay
    youtubeLink.href = youtubeWatchURL;
    videoModal.classList.remove("hidden");
    videoModal.classList.add("flex");
  });
});

// Close the modal
closeButton.addEventListener("click", () => {
  videoFrame.src = ""; // Clears the iframe
  videoModal.classList.add("hidden");
});

const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");
const closebutton = document.getElementById("closebutton");

// Open menu
menuButton.addEventListener("click", () => {
  menuPanel.classList.remove("hidden");
});

// Close menu
closebutton.addEventListener("click", () => {
  menuPanel.classList.add("hidden");
});

// Close menu when clicking outside
menuPanel.addEventListener("click", (e) => {
  if (e.target === menuPanel) {
    menuPanel.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;
  let visibleSlides = getVisibleSlides();

  function getVisibleSlides() {
    return window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 3 : 1;
  }

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= slides.length - visibleSlides;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - visibleSlides) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener("resize", () => {
    visibleSlides = getVisibleSlides();
    updateSlider();
  });

  updateSlider();
});

// Function to animate number counting
function animateValue(
  id,
  start,
  end,
  duration,
  isPercentage = false,
  hasPlus = false
) {
  const obj = document.getElementById(id);
  const range = end - start;
  const minTimer = 5;
  let stepTime = Math.abs(Math.floor(duration / range));
  stepTime = Math.max(stepTime, minTimer);

  let startTime = new Date().getTime();
  let endTime = startTime + duration;
  let timer;

  function run() {
    let now = new Date().getTime();
    let remaining = Math.max((endTime - now) / duration, 0);
    let value = Math.round(end - remaining * range);
    let formattedValue = value.toLocaleString();

    if (isPercentage) formattedValue += "%";
    if (hasPlus && value >= end) formattedValue += "+";

    obj.innerHTML = formattedValue;

    if (value >= end) {
      clearInterval(timer);
    }
  }

  timer = setInterval(run, stepTime);
  run();
}

// Object to track animation status
const animationStatus = {
  satisfaction: false,
  conversion: false,
  projects: false,
  products: false,
  clients: false,
};

// Create intersection observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        // Only animate if it hasn't been animated before
        if (!animationStatus[id]) {
          switch (id) {
            case "satisfaction":
              animateValue(id, 0, 98, 2000, true);
              break;
            case "conversion":
              animateValue(id, 0, 1000, 2000, false, true);
              break;
            case "projects":
              animateValue(id, 0, 100, 2000, false, true);
              break;
            case "products":
              animateValue(id, 0, 10, 2000, false, false);
              break;
            case "clients":
              animateValue(id, 0, 250, 2000, false, true);
              break;
          }

          // Mark this animation as completed
          animationStatus[id] = true;

          // Optionally, stop observing this element
          observer.unobserve(entry.target);
        }
      }
    });
  },
  {
    // Element becomes visible when it's 20% in view
    threshold: 0.2,
    // Start animation slightly before element comes into view
    rootMargin: "50px",
  }
);

// Start observing elements when page loads
window.onload = function () {
  // Observe all elements that need animation
  const elements = [
    "satisfaction",
    "conversion",
    "projects",
    "products",
    "clients",
  ];

  elements.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });
};

const banner = document.getElementById("banner");
const purpleText = document.getElementById("purpleText");
const blackText = document.getElementById("blackText");

banner.addEventListener("click", () => {
  // Only reset the black bar animation since purple should only play once
  blackText.style.animation = "none";
  blackText.offsetHeight;
  blackText.style.animation = "slideLeftToRight 8s linear infinite";
});

// Testimonials slider
let index = 0;
const slider = document.getElementById("testimonial-slider");
const testimonials = document.querySelectorAll(".testimonial");
const totalTestimonials = testimonials.length;

function showNextTestimonial() {
  index = (index + 1) % totalTestimonials;
  slider.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(showNextTestimonial, 5000); // Slide every 5 seconds

// Work section slider
const workSlider = document.getElementById("slider");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
let stepIndex = 0;

function updateSlider() {
  workSlider.style.transform = `translateX(-${stepIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  if (stepIndex < 3) {
    stepIndex++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (stepIndex > 0) {
    stepIndex--;
    updateSlider();
  }
});
