const db = require("../database/dbConfig");

module.exports = {
  getAllStories,
  getStoryById,
  // getStoryByUserName,
  getStoryByUserId,
  AddStory,
  updateStory,
  deleteStory,
};

function getAllStories() {
  return db("stories").select("user_id", "id", "storyTitle", "storyDate", "story", "img");
}

function getStoryById(id) {
  return db("stories")
    .select("id", "storyTitle", "storyDate", "story", "img")
    .where({ id })
    .first();
}

// function getStoryByUserName(username) {
//   return db("stories as s")
//     .join("users as u", "u.id", "s.user_id")
//     .select("u.username", "s.id", "s.storyTitle", "s.storyDate", "s.story", "s.img")
//     .where("u.username", username)
//     .first();
// }
function getStoryByUserId(user_id) {
  return db("stories")
    .select("id", "storyTitle", "storyDate", "story", "img")
    .where(user_id);
}

function AddStory(story) {
  return db("stories")
    .insert(story)
    .then(id => {
      getStoryById(id[0]);
    });
}

function updateStory(id, changes) {
  db("stories").where(id).update(changes)
  return getStoryById(id);
}

function deleteStory(id) {
  return db("stories").where("id", id).del();
}
