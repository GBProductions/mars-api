import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$('#submit').click(function() {

  let promise = new Promise(function(resolve, reject) {

    let request = new XMLHttpRequest();
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;

    request.onload = function() {
        if (this.status === 200) {
        resolve(request.response);
        } else {
        reject(request.response);
        }
    };

    request.open("GET", url, true);
    request.send();
        });

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.show').append(`<img src="${body.hdurl}">`);
      $('.showErrors').text("");
    }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error}`);
        $('.show').text("");
    });
});
