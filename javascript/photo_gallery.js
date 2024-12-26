const sliders = document.querySelectorAll('.post-slider');

sliders.forEach((slider) => {
	let startX = 0;
	let currentIndex = 0;
	let isSwiping = false;
	let translateX = 0;

	// Get the images inside the slider
	const images = slider.querySelectorAll('.post-image');

	// Function to update the position of the slider
	const updateSliderPosition = () => {
		slider.style.transition = 'transform 0.5s ease-in-out'; // Add smooth transition
		slider.style.transform = `translateX(-${currentIndex * 100}%)`; // Ensure only 1 image is visible
	};

	// Start automatic slideshow
	let interval = setInterval(() => {
		currentIndex = (currentIndex + 1) % images.length; // Ensure it loops from start when reaching the end
		updateSliderPosition();
	}, 3000); // Change image every 3 seconds

	// Stop slideshow while swiping
	const stopSlideshow = () => clearInterval(interval);

	// Touch event listeners
	slider.addEventListener('touchstart', (e) => {
		startX = e.touches[0].clientX;
		translateX = -currentIndex * slider.offsetWidth;
		stopSlideshow();
		isSwiping = true;
		slider.style.transition = 'none'; // Disable animation for smooth drag
	});

	slider.addEventListener('touchmove', (e) => {
		if (!isSwiping) return;

		const deltaX = e.touches[0].clientX - startX;
		slider.style.transform = `translateX(${translateX + deltaX}px)`;
	});

	slider.addEventListener('touchend', (e) => {
		if (!isSwiping) return;
		isSwiping = false;

		const endX = e.changedTouches[0].clientX;
		const deltaX = startX - endX;

		// Determine slide direction
		if (deltaX > 50) {
			// Swipe left (next image)
			currentIndex = (currentIndex + 1) % images.length;
		} else if (deltaX < -50) {
			// Swipe right (previous image)
			currentIndex = (currentIndex - 1 + images.length) % images.length;
		}

		// Snap to closest image
		updateSliderPosition();

		// Restart slideshow
		interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length; // Ensure it loops from start when reaching the end
			updateSliderPosition();
		}, 3000);
	});

	// Listen for the wheel scroll event to loop images
	slider.addEventListener('wheel', (e) => {
		if (e.deltaY > 0) {
			// Scroll down (next image)
			currentIndex = (currentIndex + 1) % images.length; // Ensure it loops from start when reaching the end
		} else {
			// Scroll up (previous image)
			currentIndex = (currentIndex - 1 + images.length) % images.length; // Ensure it loops back when scrolling up
		}

		updateSliderPosition();
	});
});

// Like button functionality
document.querySelectorAll('.like-btn').forEach((button) => {
	button.addEventListener('click', (e) => {
		e.stopPropagation(); // Prevent interference with swipe
		const span = button.querySelector('span'); // Get the span element inside the button
		if (button.classList.contains('liked')) {
			button.classList.remove('liked');
			span.textContent = 'Like'; // Change text to "Like" when unliked
			button.style.backgroundColor = ''; // Reset the background color
		} else {
			button.classList.add('liked');
			span.textContent = 'Liked'; // Change text to "Liked" when liked
			button.style.backgroundColor = '#7dfaff'; // Set the background color to a red shade when liked
		}
	});
});
