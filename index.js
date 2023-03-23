//------------------------------------------------------------------------

const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

const path = require("path");
//const staticPath = path.join(__dirname, "./public");

app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method_override"));

global.DEBUG = true;

//--------------------------------------------------------------

app.get("/", (req, res) => {
  res.render("home.ejs");
});

//--------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
