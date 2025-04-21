const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//also an option is to make a random generator for the options with an
//array of options and a random number generator to choose stuff
//and do a simple input/output little thing and then add features
//like ai and make it more responsive
