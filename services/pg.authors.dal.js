// getting connect to the data base

const dal = require("./qap3_pg_db");

// function to get all authors from the database

var getAuthors = function () {
  if (DEBUG) console.log("authors.pg.dal.getAuthors()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, first_name, last_name, dob FROM public."author" \
          ORDER BY id DESC LIMIT 6;`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// function to get an author by id

var getAuthorById = function (id) {
  if (DEBUG) console.log("authors.pg.dal.getAuthorById()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, first_name, last_name, dob FROM public."author" WHERE id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// function to add an author

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

// function to delete an author by id

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

// function to edit an author

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

// function to replace an author

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

// exporting functions

module.exports = {
  getAuthors,
  getAuthorById,
  addAuthor,
  deleteAuthor,
  patchAuthor,
  putAuthor,
};
