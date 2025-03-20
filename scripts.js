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



  let formSubmitted = false;

    // Function to close the popup form
    function closeForm() {
      document.getElementById("popupOverlay").style.display = "none";
    }

    // Function to show the popup form
    function showPopupForm(event) {
      event.preventDefault();
      document.getElementById("popupOverlay").style.display = "flex";
    }

    // Attach event listeners to all download buttons
    document
      .querySelectorAll(".download-btn, .button2-download, .down-btn, .btn, a[href='#'], a[href='contact'], a[href='price'] ")
      .forEach((button) => {
        button.addEventListener("click", showPopupForm);
      });

    // Show the form on page load (optional)
    window.onload = function () {
      document.getElementById("popupOverlay").style.display = "flex"; // Automatically show form on page load
    };

    // Function to handle form submission
    document
      .getElementById("contactForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        if (formSubmitted) {
          alert("Form already submitted!");
          return;
        }

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const termsChecked = document.getElementById("termsCheckbox").checked;

        // Validate required fields
        if (!name || !email || !mobile || !termsChecked) {
          alert("All fields are required, and you must accept the terms.");
          return;
        }

        // Validate phone number (must be exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(mobile)) {
          alert("Please enter a valid 10-digit phone number.");
          return;
        }

        // Additional fixed fields
        const project = "iLife Business Zone"; // Fixed project name
        const source = "Website"; // Fixed source value

        // Payload to send
        const payload = { name, email, mobile, project, source };

  try {
    // Step 1: Always send data to email via PHP backend, even if API fails
    const emailHandlerUrl = "/emailHandler.php"; // Update with correct PHP script path
    const emailResponse = await fetch(emailHandlerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload), // Convert JSON to URL-encoded string
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.json();
      throw new Error(emailError.message || "Failed to send email");
    }
    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult.message);
  } catch (error) {
    console.error("Email Error:", error.message);
  }


  try {
    // Step 2: Try sending data to API
    const apiUrl = "https://maestro-realtek.turbo.8ease.co/public/companies/1dc9b9ef-c91a-4f4e-8cde-3020ed6747d2/leads-all"; // Demo API URL
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      throw new Error("Failed to submit data to API");
    }
    const apiResult = await apiResponse.json();
    console.log("Data sent to API successfully:", apiResult);
  } catch (error) {
    console.error("API Error:", error.message);
  }

  // Step 3: Redirect to thank-you page regardless of errors
  formSubmitted = true; // Mark the form as submitted
  window.location.href = "thank-you.html"; // Redirect to thank-you page
      });