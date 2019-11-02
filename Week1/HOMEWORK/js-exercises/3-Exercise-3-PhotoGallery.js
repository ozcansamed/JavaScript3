'use strict';

console.log('EXERCISE 3 - Photo Gallery');

// EXERCISE-3 =>
// 1=> Write a function that makes an API call to https://picsum.photos/400
// 2=> Create an index.html file that will display your random image
// 3=> Write two programs: one with XMLHttpRequest, and the other with axios
// 4=> Each function should make an API call to the given endpoint: https://picsum.photos/400
// 5=> After receiving the data, render it to the page in a < img >
// 6=> Incorporate error handling.

// ------with XMLHttpRequest------

(function loadPhoto() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://picsum.photos/400', true);

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      const galleryImage = document.createElement('img');
      document.body.appendChild(galleryImage);
      galleryImage.setAttribute('src', xhr.responseURL);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  xhr.onerror = () => {
    console.log(`Network error: Failed to connect server.`);
  };
  xhr.send();
})();

// ------with axios (short version)------

axios
  .get('https://picsum.photos/400')
  .then(response => {
    const galleryImage = document.createElement('img');
    document.body.appendChild(galleryImage);
    galleryImage.setAttribute('src', response.request.responseURL);
  })
  .catch(error => console.log(error));
