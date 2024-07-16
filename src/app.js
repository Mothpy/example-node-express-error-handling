const express = require("express");
const app = express();

// router-level middleware 
const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next(`State abbreviation ${abbreviation} is invalid.`);
  } else {
    next();
  }
};
 
// Routes
app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`);
  }
);

app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
  }
);


// Error Handlers
// not-found handler
app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!`);
});

// error-handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;
