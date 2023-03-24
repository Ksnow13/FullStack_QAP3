const dal = require("./qap3_pg_db");

var getAuthors = function () {
  if (DEBUG) console.log("authors.pg.dal.getAuthors()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, first_name, last_name, dob FROM public."author" \
          ORDER BY id DESC LIMIT 6;`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getAuthorById = function (id) {
  if (DEBUG) console.log("authors.pg.dal.getAuthorById()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, first_name, last_name, dob FROM public."author" WHERE id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var addAuthor = function (first_name, last_name, dob) {
  if (DEBUG) console.log("authors.pg.dal.addAuthor()");
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO public."author"(first_name, last_name, dob) \
              VALUES ($1, $2, $3);`;
    dal.query(sql, [first_name, last_name, dob], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var deleteAuthor = function (id) {
  if (DEBUG) console.log("authors.pg.dal.deleteAuthor()");
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM public."author" WHERE id = $1;`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var patchAuthor = function (id, first_name, last_name, dob) {
  if (DEBUG) console.log("authors.pg.dal.patchAuthor()");
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE public."author" SET first_name=$2, last_name=$3, dob=$4 WHERE id=$1;`;
    dal.query(sql, [id, first_name, last_name, dob], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var putAuthor = function (id, first_name, last_name, dob) {
  if (DEBUG) console.log("authors.pg.dal.putAuthor()");
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE public."author" SET first_name=$2, last_name=$3, dob=$4 WHERE id=$1;`;
    dal.query(sql, [id, first_name, last_name, dob], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getAuthors,
  getAuthorById,
  addAuthor,
  deleteAuthor,
  patchAuthor,
  putAuthor,
};
