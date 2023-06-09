// getting connect to the data base

const dal = require("./qap3_pg_db");

// function to get all patrons from the database

var getPatrons = function () {
  if (DEBUG) console.log("patrons.pg.dal.getPatrons()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, first_name, last_name, phone, email, province_id, areacode_id FROM public."patron" \
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

// function to get book from the database by id

var getPatronById = function (id) {
  if (DEBUG) console.log("patrons.pg.dal.getPatronById()");
  return new Promise(function (resolve, reject) {
    const sql = `SELECT id, first_name, last_name, phone, email, province_id, areacode_id FROM public."patron" WHERE id = $1`;
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

// function to add a patron to the database

var addPatron = function (
  first_name,
  last_name,
  phone,
  email,
  province_id,
  areacode_id
) {
  if (DEBUG) console.log("patrons.pg.dal.addPatron()");
  return new Promise(function (resolve, reject) {
    const sql = `INSERT INTO public."patron"(first_name, last_name, phone, email, province_id, areacode_id) \
              VALUES ($1, $2, $3, $4, $5, $6);`;
    dal.query(
      sql,
      [first_name, last_name, phone, email, province_id, areacode_id],
      (err, result) => {
        if (err) {
          if (DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

// function to delete a patron from the database by id

var deletePatron = function (id) {
  if (DEBUG) console.log("patrons.pg.dal.deletePatron()");
  return new Promise(function (resolve, reject) {
    const sql = `DELETE FROM public."patron" WHERE id = $1;`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// function to edit a patron from the database

var patchPatron = function (
  id,
  first_name,
  last_name,
  phone,
  email,
  province_id,
  areacode_id
) {
  if (DEBUG) console.log("patrons.pg.dal.patchPatron()");
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE public."patron" SET first_name=$2, last_name=$3, phone=$4, email=$5, province_id=$6, areacode_id=$7 WHERE id=$1;`;
    dal.query(
      sql,
      [id, first_name, last_name, phone, email, province_id, areacode_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

// function to replace a patron from the database

var putPatron = function (
  id,
  first_name,
  last_name,
  phone,
  email,
  province_id,
  areacode_id
) {
  if (DEBUG) console.log("patrons.pg.dal.putPatron()");
  return new Promise(function (resolve, reject) {
    const sql = `UPDATE public."patron" SET first_name=$2, last_name=$3, phone=$4, email=$5, province_id=$6, areacode_id=$7 WHERE id=$1;`;
    dal.query(
      sql,
      [id, first_name, last_name, phone, email, province_id, areacode_id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

// exporting functions

module.exports = {
  getPatrons,
  getPatronById,
  addPatron,
  deletePatron,
  patchPatron,
  putPatron,
};
