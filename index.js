/*
Kyle Snow
QAP 3 - FullStack
Keyin Collage
started: March 25, 2023
finished: April 3, 2023
*/

// setting const to set up npm packages, ports and paths

const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;
const path = require("path");

// setting up view engine for ejs

app.set("view engine", "ejs");

// using express.static to make the css style sheet to work across views

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// setting up method override

app.use(methodOverride("_method_override"));

// global debug

global.DEBUG = true;

// setting up the home and about page

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/about", (request, response) => {
  response.render("about.ejs");
});

// routers for each database table

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

const authorsRouter = require("./routes/authors");
app.use("/authors", authorsRouter);

const patronsRouter = require("./routes/patrons");
app.use("/patrons", patronsRouter);

// api router

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

// error 404 routes. gets called when no routes match

app.use((req, res) => {
  res.status(404).render("404");
});

// runs this code with the app starts on port 3000

app.listen(PORT, () => {
  console.log(`The app running on port ${PORT}.`);
  console.log(`Press Ctrl C to terminate...`);
  console.log("");
});
