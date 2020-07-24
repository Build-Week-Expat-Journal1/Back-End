const db = require("../database/dbConfig");

module.exports = {
  getAllStories,
  getStoryById,
  //   getStoryByUserName,
  getStoryByUserId,
  AddStory,
  updateStory,
  deleteStory,
};

function getAllStories() {
  return db("stories").select("id", "storyTitle", "storyDate", "story", "img");
}

function getStoryById(id) {
  return db("stories")
    .select("id", "storyTitle", "storyDate", "story", "img")
    .where({ id })
    .first();
}

// function getStoryByUserName(username) {
//   return db("stories")
//     .select("id", "storyTitle", "storyDate", "story", "img")
//     .where({ username })
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
    .then(ids => {
      getStoryById(ids[0]);
    });
}

function updateStory(id, changes) {
  return db("stories").where({ id }).update(changes);
}

function deleteStory(id) {
  return db("stories").where("id", id).del();
}
