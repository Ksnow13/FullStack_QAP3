var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/books");
}
// http://localhost:3000/api/actors/
const booksRouter = require("./books");
router.use("/books", booksRouter);

// http://localhost:3000/api/logins/
const authorsRouter = require("./authors");
router.use("/authors", authorsRouter);

// http://localhost:3000/api/logins/
const patronsRouter = require("./patrons");
router.use("/patrons", patronsRouter);

module.exports = router;
