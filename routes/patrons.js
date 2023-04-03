// setting up packages and functions

const express = require("express");
const router = express.Router();
const patronsDal = require("../services/pg.patrons.dal");

// router to get patrons from database - GET

router.get("/", async (req, res) => {
  try {
    let thePatrons = await patronsDal.getPatrons();
    if (DEBUG) console.table(thePatrons);
    res.render("patrons", { thePatrons });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to get a patron by id - GET

router.get("/:id", async (req, res) => {
  try {
    let aPatron = await patronsDal.getPatronById(req.params.id); // from postgresql
    if (aPatron.length === 0) res.render("norecordfound");
    else res.render("patron", { aPatron });
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to add a patron to the database - POST

router.post("/", async (req, res) => {
  if (DEBUG) console.log("patrons.POST");
  try {
    await patronsDal.addPatron(
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.email,
      req.body.province_id,
      req.body.areacode_id
    );
    res.redirect("/patrons");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// router to delete a patron by id - DELETE

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("patron.Delete : " + req.params.id);
  res.render("patronDelete.ejs", {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    phone: req.query.phone,
    email: req.query.email,
    province_id: req.query.province_id,
    areacode_id: req.query.areacode_id,
    theId: req.params.id,
  });
});

// router to edit a patron by id - PATCH

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("patron.Edit : " + req.params.id);
  res.render("patronPatch.ejs", {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    phone: req.query.phone,
    email: req.query.email,
    province_id: req.query.province_id,
    areacode_id: req.query.areacode_id,
    theId: req.params.id,
  });
});

// router to replace a patron by id - PUT

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("patron.Replace : " + req.params.id);
  res.render("patronPut.ejs", {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    phone: req.query.phone,
    email: req.query.email,
    province_id: req.query.province_id,
    areacode_id: req.query.areacode_id,
    theId: req.params.id,
  });
});

// creating the delete router

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("patrons.DELETE: " + req.params.id);
  try {
    await patronsDal.deletePatron(req.params.id);
    res.redirect("/patrons");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// creating the patch router

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("patrons.PATCH: " + req.params.id);
  try {
    await patronsDal.patchPatron(
      req.params.id,
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.email,
      req.body.province_id,
      req.body.areacode_id
    );
    res.redirect("/patrons");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// creating the put router

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("patron.PUT: " + req.params.id);
  try {
    await patronsDal.putPatron(
      req.params.id,
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.email,
      req.body.province_id,
      req.body.areacode_id
    );
    res.redirect("/patrons");
  } catch {
    if (DEBUG) console.log("Error 503 - Internal Server Error.");
    res.render("503");
  }
});

// exporting the routers

module.exports = router;
