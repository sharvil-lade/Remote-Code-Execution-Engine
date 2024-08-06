const express = require("express");
const app = express();

const server = app.listen(3000, function () {
  const host = server.address().address || "localhost";
  const port = server.address().port;
  console.log(`Listening at http://${host}:${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
