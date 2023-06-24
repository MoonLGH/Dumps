// Client-side JavaScript code

// Fetch the list of uploaded images from the server
function fetchImages() {
    fetch('/getAllImages')
      .then(response => response.json())
      .then(images => {
        const imageList = document.getElementById('image-list');
        imageList.innerHTML = '';
  
        images.forEach(image => {
          const img = document.createElement('img');
          img.src = `/imageGet?name=${image}`;
          img.alt = 'Uploaded Image';
          imageList.appendChild(img);
        });
      })
      .catch(error => console.log(error));
  }
  
  // Call fetchImages() to load the initial list of uploaded images
  fetchImages();
  