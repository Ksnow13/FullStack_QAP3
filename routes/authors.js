// setting up packages and functions

const express = require("express");
const router = express.Router();
const authorsDal = require("../services/pg.authors.dal");

// router to get authors from database - GET

router.get("/", async (req, res) => {
  try {
    let theAuthors = await authorsDal.getAuthors();
    if (DEBUG) console.table(theAuthors);
    res.render("authors", { theAuthors });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to get an author by id - GET

router.get("/:id", async (req, res) => {
  try {
    let aAuthor = await authorsDal.getAuthorById(req.params.id);
    if (aAuthor.length === 0) res.render("norecordfound");
    else res.render("author", { aAuthor });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to add a author to the database - POST

router.post("/", async (req, res) => {
  if (DEBUG) console.log("authors.POST");
  try {
    await authorsDal.addAuthor(
      req.body.first_name,
      req.body.last_name,
      req.body.dob
    );
    res.redirect("/authors");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to delete an author by id - DELETE

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("author.Delete : " + req.params.id);
  res.render("authorDelete.ejs", {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    dob: req.query.dob,
    theId: req.params.id,
  });
});

// router to edit an author by id - PATCH

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("author.Edit : " + req.params.id);
  res.render("authorPatch.ejs", {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    dob: req.query.dob,
    theId: req.params.id,
  });
});

// router to replace an author by id - PUT

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("author.Replace : " + req.params.id);
  res.render("authorPut.ejs", {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    dob: req.query.dob,
    theId: req.params.id,
  });
});

// creating the delete router

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("authors.DELETE: " + req.params.id);
  try {
    await authorsDal.deleteAuthor(req.params.id);
    res.redirect("/authors");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// creating the patch router

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("authors.PATCH: " + req.params.id);
  try {
    await authorsDal.patchAuthor(
      req.params.id,
      req.body.first_name,
      req.body.last_name,
      req.body.dob
    );
    res.redirect("/authors");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// creating the put router

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("author.PUT: " + req.params.id);
  try {
    await authorsDal.putAuthor(
      req.params.id,
      req.body.first_name,
      req.body.last_name,
      req.body.dob
    );
    res.redirect("/authors");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// exporting the routers

module.exports = router;
