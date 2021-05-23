const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    headTitle: "Weather",
    name: "Daniel Chimarnez",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    headTitle: "About",
    name: "Daniel Chimarnez",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    headTitle: "Help",
    message: "Some help message",
    name: "Daniel Chimarnez",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a valid address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          location,
          ...forecastData,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    headTitle: "404",
    errorMessage: "Help article not found, try another search",
    name: "Daniel Chimarnez",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    headTitle: "404",
    errorMessage: "Page not found",
    name: "Daniel Chimarnez",
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000.");
});