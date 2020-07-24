const express = require("express");
const router = express.Router();
const Stories = require("./storiesModel");
const restrict = require("../middleware/restrict");
const {
  getStoryById,
  getStoryByUserName,
  getStoryByUserId,
} = require("./storiesModel");

router.get("/", restrict, async (req, res, next) => {
  try {
    const stories = await Stories.getAllStories();
    res.status(200).json(stories);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Story not found" });
    }
    const stories = await getStoryById(id);
    res.status(200).json(stories);
  } catch (err) {
    next(err);
  }
});

// router.get("/:username", async (req, res, next) => {
//   const username = req.params.id;
//   const stories = await getStoryByUserName(username);
//   res.status(200).json(stories);
// });

router.get("/:userid", async (req, res, next) => {
  try {
    //   troubleshoot only returning one record even where there is more
    const userid = req.params.userid;
    const stories = await getStoryByUserId(userid);
    res.status(200).status(stories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
