import pool from "../db/client.js";

export const getAllUsers = (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json({ users: data.rows }))
    .catch((err) => res.status(500).json(err));
};

export const getSingleUser = (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then((data) => res.status(200).json(data.rows[0]))
    .catch((err) => res.status(500).json(err));
};

export const createUser = (req, res) => {
  const { first_name, last_name } = req.body;
  if (first_name && last_name) {
    pool
      .query(
        "INSERT INTO users (first_name, last_name) VALUES ($1, $2) RETURNING *;",
        [first_name, last_name]
      )
      .then((data) => {
        res.status(201).json(data.rows[0]);
      })
      .catch((err) => res.status(500).json(err));
  } else {
    res
      .status(400)
      .send(
        "incomplete user data, please specify first and last name"
      );
  }
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;
  if (first_name && last_name) {
    pool
      .query(
        "UPDATE users SET first_name=$1, last_name=$2 WHERE id=$3 RETURNING *;",
        [first_name, last_name, id]
      )
      .then((data) => res.status(200).json(data.rows[0]))
      .catch((err) => res.status(500).json(err));
  } else {
    res
      .status(400)
      .send(
        "incomplete user data, please specify first and last name"
      );
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM users WHERE id=$1 RETURNING *", [id])
    .then((data) => res.status(200).json(data.rows[0]))
    .catch((err) => res.status(500).json(err));
};
