import mariadb, { createPool } from "mariadb";
import { error } from "console";

const pool = createPool({
  host: "localhost",
  user: "v-mariadb",
  password: "v-mariadb",
  database: "sailore",
});

export const createSailorTable = () => {
  return new Promise((resolve, reject) => {
    pool
      .query(
        `CREATE TABLE SAILOR (SID INT PRIMARY KEY AUTO_INCREMENT, SNAME VARCHAR(64), RATING INT, AGE INT)`
      )
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};

export const createSailor = (name: String, rating: Number, age: Number) => {
  return new Promise((resolve, reject) => {
    pool
      .query(`INSERT INTO SAILOR (SNAME, RATING, AGE) values (?, ?, ?)`, [
        name,
        rating,
        age,
      ])
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};

export const readAllSailors = () => {
  return new Promise((resolve, reject) => {
    pool
      .query(`SELECT * FROM SAILOR`)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};

export const readSailor = (id: String) => {
  return new Promise((resolve, reject) => {
    pool
      .query(`SELECT * FROM SAILOR WHERE SID = ?`, [id])
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};

export const updateSailor = (
  id: String,
  name: String,
  rating: Number,
  age: Number
) => {
  return new Promise((resolve, reject) => {
    pool
      .query(`UPDATE SAILOR SET SNAME = ?, RATING = ?, AGE = ? WHERE SID = ?`, [
        name,
        rating,
        age,
        id,
      ])
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};

export const deleteSailor = (id: String) => {
  return new Promise((resolve, reject) => {
    pool
      .query(`DELETE FROM SAILOR WHERE SID = ?`, [id])
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};
