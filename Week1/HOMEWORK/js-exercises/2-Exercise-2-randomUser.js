'use strict';

console.log('EXERCISE 2 - Who do we have here?/Random User');

// EXERCISE-2 =>
// 1=> Write a function that makes an API call to https://www.randomuser.me/api
// 2=> Inside the same file write two functions: one with XMLHttpRequest, and the other with axios..
// 3=> Each function should make an API call to the given endpoint: https://www.randomuser.me/api
// 4=> Log the received data to the console.
// 5=> Incorporate error handling.

// ------with XMLHttpRequest------

(function randomUser() {
  // Create XHR object
  const xhr = new XMLHttpRequest();
  // Call the open function to fill it with the request URL and the request method
  xhr.open('GET', 'https://www.randomuser.me/api', true);
  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      console.log(xhr.response);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  xhr.onerror = () => {
    console.log(`Network error: Failed to connect server.`);
  };
  // Call the send function to make the request
  xhr.send();
})();

// ------with axios (short version)------

axios
  .get('https://www.randomuser.me/api')
  .then(res => console.log(res.data))
  .catch(err => console.log(err));
