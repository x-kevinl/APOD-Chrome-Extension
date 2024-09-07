chrome.runtime.onInstalled.addListener(() => {
    fetchAPODImage();
});

function fetchAPODImage() {
    fetch('https://apod.nasa.gov/apod/')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const imgElement = doc.querySelector('img');
            const imgSrc = imgElement ? `https://apod.nasa.gov/apod/${imgElement.getAttribute('src')}` : '';
            chrome.storage.sync.set({ apodImage: imgSrc });
        })
        .catch(error => console.error('Error fetching APOD:', error));
}
