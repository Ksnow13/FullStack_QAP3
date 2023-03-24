const express = require("express");
const router = express.Router();
const patronsDal = require("../services/pg.patrons.dal");

router.get("/", async (req, res) => {
  try {
    let thePatrons = await patronsDal.getPatrons();
    if (DEBUG) console.table(thePatrons);
    res.render("patrons", { thePatrons });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let aPatron = await patronsDal.getPatronById(req.params.id); // from postgresql
    if (aPatron.length === 0) res.render("norecordfound");
    else res.render("patron", { aPatron });
  } catch {
    res.render("503");
  }
});

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
    // log this error to an error log file.
    res.render("503");
  }
});

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

//----------------------------------------------

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("patrons.DELETE: " + req.params.id);
  try {
    await patronsDal.deletePatron(req.params.id);
    res.redirect("/patrons");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

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
    // log this error to an error log file.
    res.render("503");
  }
});

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
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
