var router = require("express").Router();
const authorsDal = require("../../services/pg.authors.dal");

router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/authors/ GET " + req.url);
  try {
    let theAuthors = await authorsDal.getAuthors();
    res.json(theAuthors);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/authors/:id GET " + req.url);
  try {
    let aAuthor = await authorsDal.getAuthorById(req.params.id);
    if (aAuthor.length === 0) {
      // log this error to an error log file.
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(aAuthor);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/authors/ POST");
    //    console.log(req);
  }
  try {
    await authorsDal.addAuthor(
      req.body.first_name,
      req.body.last_name,
      req.body.dob
    );
    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/authors PUT " + req.params.id);
  try {
    await authorsDal.putAuthor(
      req.params.id,
      req.body.first_name,
      req.body.last_name,
      req.body.dob
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/authors PATCH " + req.params.id);
  try {
    await authorsDal.patchAuthor(
      req.params.id,
      req.body.first_name,
      req.body.last_name,
      req.body.dob
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/authors DELETE " + req.params.id);
  try {
    await authorsDal.deleteAuthor(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

module.exports = router;
