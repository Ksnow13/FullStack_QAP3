// setting up express router

var router = require("express").Router();

// logging all routes available

if (DEBUG) {
  console.log("");
  console.log(
    "*Available api routes - Refer to curl.txt for example api commands*"
  );
  console.log("ROUTE: /api/books");
  console.log("ROUTE: /api/authors");
  console.log("ROUTE: /api/patrons");
  console.log("");
}

// creating all the api routes

// http://localhost:3000/api/books/

const booksRouter = require("./books");
router.use("/books", booksRouter);

// http://localhost:3000/api/authors/

const authorsRouter = require("./authors");
router.use("/authors", authorsRouter);

// http://localhost:3000/api/patrons/

const patronsRouter = require("./patrons");
router.use("/patrons", patronsRouter);

// exporting router

module.exports = router;
