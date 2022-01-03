import pool from "../db/client.js";

export const checkUser = (req, res, next) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => {
      if (data.rowCount == 0) {
        res.status(404).send("There is no user matching this id");
      } else {
        next();
      }
    })
    .catch((error) => res.status(500).json(error));
};
