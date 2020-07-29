const db = require('../database/dbConfig');

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUserName,
  AddUser,
  updateUser,
  deleteUser,
  // getStoryByUserId,
};

function getAllUsers() {
  return db('users').select('*');
}

function getUserById(id) {
  return db('users').where({ id }).first();
}

function getUserByUserName(username) {
  return db('users').where({ username });
}
// function getStoryByUserId(user_id) {
//   return db('stories as s')
//     .join('users as u', 'u.id', 's.user_id')
//     .select('u.username', 's.storyTitle', 's.id', 's.storyDate')
//     .where('s.user_id', user_id);
// }

function AddUser(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getUserById(ids[0]);
    });
}

function updateUser(id, changes) {
  return db('users').where({ id }).update(changes);
}

function deleteUser(id) {
  return db('users').where('id', id).del();
}
