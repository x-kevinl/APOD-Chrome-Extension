function setAPODBackground() {
    fetch('https://apod.nasa.gov/apod/')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const imgElement = doc.querySelector('img');
            const imgSrc = imgElement ? `https://apod.nasa.gov/apod/${imgElement.getAttribute('src')}` : '';

            if (imgSrc) {
                adjustImageToResolution(imgSrc);
            } else {
                document.body.style.backgroundColor = '#000'; // Fallback color
            }
        })
        .catch(error => console.error('Error fetching APOD:', error));
}

function adjustImageToResolution(imgSrc) {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // To avoid cross-origin issues
    img.src = imgSrc;

    img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Get the screen resolution
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        // Set canvas size to screen resolution
        canvas.width = screenWidth;
        canvas.height = screenHeight;

        // Calculate cropping dimensions
        const aspectRatio = screenWidth / screenHeight;
        let cropWidth = img.width;
        let cropHeight = cropWidth / aspectRatio;

        if (cropHeight > img.height) {
            cropHeight = img.height;
            cropWidth = cropHeight * aspectRatio;
        }

        // Calculate cropping starting position (center cropping)
        const startX = (img.width - cropWidth) / 2;
        const startY = (img.height - cropHeight) / 2;

        // Draw the cropped image to the canvas
        context.drawImage(img, startX, startY, cropWidth, cropHeight, 0, 0, screenWidth, screenHeight);

        // Convert canvas to a data URL and set it as the background
        const croppedImageUrl = canvas.toDataURL('image/jpeg');
        document.body.style.backgroundImage = `url(${croppedImageUrl})`;
    };

    img.onerror = () => {
        console.error('Error loading APOD image.');
        document.body.style.backgroundColor = '#000'; // Fallback color
    };
}

// Run the function to set the APOD background
setAPODBackground();
