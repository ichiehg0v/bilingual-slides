document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const totalSlides = 47; // We have 47 slides from the PDF conversion
    let currentSlide = 1;
    
    // Elements
    const leftSlides = document.getElementById('leftSlides');
    const rightSlides = document.getElementById('rightSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    
    // Initialize slide images (preload all slides)
    function initSlides() {
        // Clear existing content
        leftSlides.innerHTML = '';
        rightSlides.innerHTML = '';
        
        // Create and add all slide images
        for (let i = 1; i <= totalSlides; i++) {
            // Left slides
            const leftImg = document.createElement('img');
            leftImg.src = `left/slide${i}.png`;
            leftImg.alt = `Left Slide ${i}`;
            leftImg.className = i === currentSlide ? 'active slide-image' : 'slide-image';
            leftSlides.appendChild(leftImg);
            
            // For right slide
            const rightImg = document.createElement('img');
            // Use the corresponding slide number from the right folder
            rightImg.src = `right/slide${i}.png`;
            rightImg.alt = `Right Slide ${i}`;
            rightImg.className = i === currentSlide ? 'active slide-image' : 'slide-image';
            rightImg.style.display = i === currentSlide ? 'block' : 'none'; // Only show current slide
            rightSlides.appendChild(rightImg);
        }
        
        updateCounter();
    }
    
    // Update slide counter display
    function updateCounter() {
        slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }
    
    // Navigate to a specific slide
    function goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > totalSlides) return;
        
        // Update current slide
        currentSlide = slideNumber;
        
        // Update active slide images in left side
        document.querySelectorAll('#leftSlides img').forEach((img, index) => {
            if (index + 1 === currentSlide) {
                img.style.display = 'block';
                img.classList.add('active');
            } else {
                img.style.display = 'none';
                img.classList.remove('active');
            }
        });
        
        // Update active slide images in right side
        document.querySelectorAll('#rightSlides img').forEach((img, index) => {
            if (index + 1 === currentSlide) {
                img.style.display = 'block';
                img.classList.add('active');
            } else {
                img.style.display = 'none';
                img.classList.remove('active');
            }
        });
        
        updateCounter();
    }
    
    // Navigate to previous slide
    function prevSlide() {
        if (currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    }
    
    // Navigate to next slide
    function nextSlide() {
        if (currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        }
    }
    
    // Event listeners
    
    // Button clicks
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Click anywhere on the slide area
    document.querySelector('.slides-container').addEventListener('click', function(e) {
        // Only proceed if clicking directly on the container or an image
        if (e.target.classList.contains('slide-section') || e.target.tagName === 'IMG') {
            nextSlide();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                prevSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ': // Spacebar
                nextSlide();
                break;
        }
    });
    
    // Mouse wheel navigation
    document.addEventListener('wheel', function(e) {
        // Prevent default to avoid page scrolling
        e.preventDefault();
        
        // Determine direction
        if (e.deltaY > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }, { passive: false });
    
    // Initialize
    initSlides();
});
