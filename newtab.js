chrome.storage.sync.get('apodImage', (data) => {
    if (data.apodImage) {
        document.body.style.backgroundImage = `url(${data.apodImage})`;
    } else {
        document.body.style.backgroundColor = '#000'; // Fallback color if the image is not available
    }
});
