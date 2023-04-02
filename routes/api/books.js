var router = require("express").Router();
const booksDal = require("../../services/pg.books.dal");

router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/books/ GET " + req.url);
  try {
    let theBooks = await booksDal.getBooks();
    res.json(theBooks);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

// api/actors/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/books/:id GET " + req.url);
  try {
    let aBook = await booksDal.getBookById(req.params.id);
    if (aBook.length === 0) {
      // log this error to an error log file.
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(aBook);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/books/ POST");
    //    console.log(req);
  }
  try {
    await booksDal.addBook(
      req.body.title,
      req.body.author_id,
      req.body.publisher_id,
      req.body.isbn
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
  if (DEBUG) console.log("ROUTE: /api/books PUT " + req.params.id);
  try {
    await booksDal.putBook(
      req.params.id,
      req.body.title,
      req.body.author_id,
      req.body.publisher_id,
      req.body.isbn
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
  if (DEBUG) console.log("ROUTE: /api/books PATCH " + req.params.id);
  try {
    await booksDal.patchBook(
      req.params.id,
      req.body.title,
      req.body.author_id,
      req.body.publisher_id,
      req.body.isbn
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
  if (DEBUG) console.log("ROUTE: /api/books DELETE " + req.params.id);
  try {
    await booksDal.deleteBook(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});

module.exports = router;
