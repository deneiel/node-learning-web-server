const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidGFycm9tYXAiLCJhIjoiY2tveGM4dHU5MGNjcTJ5bzJxdWEwN2thOCJ9.2kIqCFi86c66GX0bhWYfmQ&limit=1";

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { place_name: location, center } = body.features[0];
      const [longitude, latitude] = center;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
