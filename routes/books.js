// setting up packages and functions

const express = require("express");
const router = express.Router();
const booksDal = require("../services/pg.books.dal");

// router to get books from database - GET

router.get("/", async (req, res) => {
  try {
    let theBooks = await booksDal.getBooks();
    if (DEBUG) console.table(theBooks);
    res.render("books", { theBooks });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to get a book by id - GET

router.get("/:id", async (req, res) => {
  try {
    let aBook = await booksDal.getBookById(req.params.id); // from postgresql
    if (aBook.length === 0) res.render("norecordfound");
    else res.render("book", { aBook });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to add a book to the database - POST

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
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to delete a book by id - DELETE

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

// router to edit a book by id - PATCH

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

// router to replace an author by id - PUT

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("book.Replace : " + req.params.id);
  res.render("bookPut.ejs", {
    title: req.query.title,
    author_id: req.query.author_id,
    publisher_id: req.query.publisher_id,
    isbn: req.query.isbn,
    theId: req.params.id,
  });
});

// creating the delete router

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("books.DELETE: " + req.params.id);
  try {
    await booksDal.deleteBook(req.params.id);
    res.redirect("/books");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// creating the patch router

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
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// creating the put router

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("books.PUT: " + req.params.id);
  try {
    await booksDal.putBook(
      req.params.id,
      req.body.title,
      req.body.author_id,
      req.body.publisher_id,
      req.body.isbn
    );
    res.redirect("/books");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// exporting the routers

module.exports = router;
