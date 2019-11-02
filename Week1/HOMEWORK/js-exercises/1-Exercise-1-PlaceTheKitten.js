'use strict';

console.log('EXERCISE 1 - Place The Kitten');

// EXERCISE-1 =>
// 1=> Write an function that makes an API call to https://dog.ceo/dog-api/ => https://dog.ceo/api/breeds/image/random
// 2=> Inside the same file write two programs: one with XMLHttpRequest, and the other with axios
// 3=> Each function should make an API call to the given endpoint.
// 4=> Log the received data to the console.
// 5=> Incorporate error handling.

// ------with XMLHttpRequest------

(function placeKitten() {
  const url = 'https://dog.ceo/api/breeds/image/random';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      console.log(xhr.response);
    } else {
      console.log('Some Failure: ', xhr.status, xhr.statusText);
    }
  });
  xhr.addEventListener('error', () => {
    console.log('Network Error: Could not connect to the server.');
  });
  xhr.send();
})();

// ------with axios (short version)------

axios
  .get('https://dog.ceo/api/breeds/image/random')
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
