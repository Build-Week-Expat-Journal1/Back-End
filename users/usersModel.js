const db = require("../database/dbConfig");

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUserName,
  AddUser,
  updateUser,
  deleteUser,
};

function getAllUsers() {
  return db("users").select(id, username);
}

function getUserById(id) {
  return db("users").where({ id }).first();
}

function getUserByUserName(username) {
  return db("users").where({ username }).first();
}

function AddUser(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return getUserById(ids[0]);
    });
}

function updateUser(id, changes) {
  return db("users").where({ id }).update(changes);
}

function deleteUser(id) {
  return db("users").where("id", id).del();
}
