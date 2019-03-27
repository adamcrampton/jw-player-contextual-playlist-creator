// Creates a contextual playlist in the JW Player platform.
// See https://developer.jwplayer.com/jw-platform/reference/v1/methods/channels/create.html.
// Call syntax: <http|s>://<APIserver>/<APIversion>/<callClass>/<callSubclass>/<method|attribute>[?<parameters>]

// Require libraries
// =================
const crypto = require('crypto');
const request = require('request');

// Define settings
// ===============
const playlistNames = ['your', 'array', 'of', 'playlist', 'names'];
const endpoint = "https://api.jwplatform.com/v1/channels/create?text=playlistcreation&type=article_matching";

// Credentials
// ===========
const api_key = "yourapikey";
const api_secret = "yoursecret";
const api_timestamp = Date.now();
const api_nonce = makeNonce(8);
const api_signature = makeApiSignature();

// Make the request for each playlist and output results
// =====================================================
const playlistLength = playlistNames.length;

for (let i=0; i < playlistLength; i++) {
  // Create request string.
  let requestString = endpoint + '&title=' + playlistNames[i] + '&api_format=xml' + '&api_key=' + api_key + '&api_nonce=' + api_nonce + '&api_timestamp=' + api_timestamp + '&api_signature=' + api_signature;

  request(requestString, function (error, response, body) {
    console.log('Processing creation of playlist: ' + playlistNames[i])
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Output response body
  });
}

// Helpers
// =======
// Nonce generator - see https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeNonce(length) {
    var nonce = "";
    var possible = "0123456789";
  
    for (var i = 0; i < length; i++) {
        nonce += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return nonce;
  }

function makeApiSignature() {
  // Create string of parameters to be hashed.
  let hashString = 'api_format=xml&api_key=' + api_key + '&api_nonce=' + api_nonce + '&api_timestamp=' + api_timestamp + '&text=playlistcreation' + api_secret;

    shaSum = crypto.createHash('sha1');
    shaSum.update(hashString);

    return shaSum.digest('hex');
}