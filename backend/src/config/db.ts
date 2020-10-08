import { createPool } from "mariadb";
import { config } from "dotenv";

config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.on("connection", function (connection) {
  console.log("DB:: Connected");
});

pool.on("acquire", function (connection) {
  console.log("DB:: Connection %d acquired", connection.threadId);
});

pool.on("enqueue", function () {
  console.log("DB:: Waiting for available connection");
});

pool.on("release", function (connection) {
  console.log("DB:: Connection %d released", connection.threadId);
});

export default pool;
