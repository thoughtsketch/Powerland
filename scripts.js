const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
});

closeBtn.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
});

//hero slider

document.addEventListener("DOMContentLoaded", function () {
    const carouselBody = document.getElementById("carouselBody");
    const slides = document.querySelectorAll(".hs-carousel-slide");
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;
    const totalSlides = slides.length;
    const intervalTime = 5000; // 5 seconds
  
    function goToSlide(index) {
      currentIndex = index;
      const offset = -index * 100;
      carouselBody.style.transform = `translateX(${offset}%)`;
  
      // Update active dot
      dots.forEach((dot, i) => {
        dot.style.opacity = i === index ? "1" : "0.5";
      });
    }
  
    // Auto-slide function
    function startAutoSlide() {
      return setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
      }, intervalTime);
    }
  
    let autoSlide = startAutoSlide();
  
    // Event listeners for dots
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goToSlide(i);
        clearInterval(autoSlide);
        autoSlide = startAutoSlide();
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.getElementById("galleryScroll");
    const scrollLeftButton = document.getElementById("scrollLeft");
    const scrollRightButton = document.getElementById("scrollRight");
    const images = scrollContainer.getElementsByClassName("gallery-item");
  
    // Function to handle manual scroll
    function scrollGallery(direction) {
      const imageWidth = images[0].offsetWidth;
      const currentScrollPosition = scrollContainer.scrollLeft;
      const newScrollPosition =
        direction === "left"
          ? currentScrollPosition - imageWidth
          : currentScrollPosition + imageWidth;
  
      scrollContainer.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  
    // Scroll left button event
    scrollLeftButton.addEventListener("click", () => {
      scrollGallery("left");
    });
  
    // Scroll right button event
    scrollRightButton.addEventListener("click", () => {
      scrollGallery("right");
    });
  
    // Scroll event listener to trigger the form after scrolling 2 images
    let formTriggered = false;
    scrollContainer.addEventListener("scroll", () => {
      const imageWidth = images[0].offsetWidth;
      const scrolled = scrollContainer.scrollLeft;
      const imagesScrolled = Math.floor(scrolled / imageWidth);
  
      if (imagesScrolled >= 2 && !formTriggered) {
        formTriggered = true;
        showContactForm(); // Trigger the contact form after 2 images have been scrolled
      }
    });
  
    // Function to show contact form
    function showContactForm() {
      document.getElementById("popupOverlay").style.display = "flex";
    }
  
    // Close the form when the user clicks on the close button
    function closeForm() {
      document.getElementById("popupOverlay").style.display = "none";
    }
  
    // Automatically trigger form on page load
    window.onload = function () {
      document.getElementById("popupOverlay").style.display = "flex";
    };
  });