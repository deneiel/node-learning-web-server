const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c5fd37d20714e5becb94162c2a9aafd5&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const { temperature, feelslike, weather_descriptions, humidity } =
        body.current;
      callback(undefined, {
        temperature,
        feelslike,
        weather_descriptions,
        humidity,
      });
    }
  });
};

module.exports = forecast;
