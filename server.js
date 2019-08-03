const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API is Running"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
