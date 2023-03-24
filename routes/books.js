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

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("book.Delete : " + req.params.id);
  res.render("bookDelete.ejs", {
    title: req.query.title,
    author_id: req.query.author_id,
    publisher_id: req.query.publisher_id,
    isbn: req.query.isbn,
    theId: req.params.id,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("book.Edit : " + req.params.id);
  res.render("bookPatch.ejs", {
    title: req.query.title,
    author_id: req.query.author_id,
    publisher_id: req.query.publisher_id,
    isbn: req.query.isbn,
    theId: req.params.id,
  });
});

//---------------------

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("books.DELETE: " + req.params.id);
  try {
    await booksDal.deleteBook(req.params.id);
    res.redirect("/books");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("books.PATCH: " + req.params.id);
  try {
    await booksDal.patchBook(
      req.params.id,
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
