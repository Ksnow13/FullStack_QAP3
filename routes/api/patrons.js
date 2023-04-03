// setting up express router and getting access to pg.patrons.dal

var router = require("express").Router();
const patronsDal = require("../../services/pg.patrons.dal");

// router to get all patrons in json format using the api

router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/patrons/ GET " + req.url);
  try {
    let thePatrons = await patronsDal.getPatrons();
    res.json(thePatrons);
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// router to get a patron by id in json format using the api

router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/patrons/:id GET " + req.url);
  try {
    let aPatron = await patronsDal.getPatronById(req.params.id);
    if (aPatron.length === 0) {
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(aPatron);
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// router to add a patron using the api

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/patrons/ POST");
  }
  try {
    await patronsDal.addPatron(
      req.body.first_name,
      req.body.last_name,
      req.body.phone,
      req.body.email,
      req.body.province_id,
      req.body.areacode_id
    );
    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// router to edit a patron using the api

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/patrons PUT " + req.params.id);
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
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// router to replace a patron using the api

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/patrons PATCH " + req.params.id);
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
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// router to delete a patron using the api

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/patrons DELETE " + req.params.id);
  try {
    await patronsDal.deletePatron(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// exporting the routers

module.exports = router;
