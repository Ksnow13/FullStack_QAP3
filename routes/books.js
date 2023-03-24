//------------------------------------

const express = require("express");
const router = express.Router();
const booksDal = require("../services/pg.books.dal");

router.get("/", async (req, res) => {
  try {
    let theBooks = await booksDal.getBooks();
    if (DEBUG) console.table(theBooks);
    res.render("books", { theBooks });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let aBook = await booksDal.getBookById(req.params.id); // from postgresql
    if (aBook.length === 0) res.render("norecordfound");
    else res.render("book", { aBook });
  } catch {
    res.render("503");
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("books.POST");
  try {
    await booksDal.addBook(
      req.body.title,
      req.body.author_id,
      req.body.publisher_id,
      req.body.isbn
    );
    res.redirect("/books");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
