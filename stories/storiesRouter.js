const express = require("express");
const router = express.Router();
const Stories = require("./storiesModel");
const restrict = require("../middleware/restrict");


router.get("/", restrict, async (req, res, next) => {
  try {
    const stories = await Stories.getAllStories();
    res.status(200).json(stories);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restrict, async (req, res, next) => {
  try {
    const id = req.params.id;

    const stories = await Stories.getStoryById(id);
    if (!stories) {
      res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(stories);
  } catch (err) {
    next(err);
  }
});

// router.get("/:username", async (req, res, next) => {
//   const username = req.params.id;
//   const stories = await Stories.getStoryByUserName(username);
//   console.log(username);
//   res.status(200).json(stories);
// });

router.get("/:userid", restrict, restrict, async (req, res, next) => {
  try {
    //   troubleshoot only returning one record even where there is more
    const userid = req.params.userid;
    const stories = await Stories.getStoryByUserId(userid);
    if (!stories) { res.status(404).json({ message: "no stories found for this user" }) }
    res.status(200).status(stories);
  } catch (err) {
    next(err);
  }
});

router.post("/add", restrict, async (req, res, next) => {
  try {
    const story = req.body;
    const newStory = await Stories.AddStory(story);
    res.status(201).json(newStory)
  } catch (err) {
    next(err)
  }
})

router.put("/update/:id", restrict, async (req, res, next) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const newStory = await Stories.updateStory(id, changes)
    res.status(202).json(newStory)
  } catch (err) {
    next(err)
  }
})

router.delete("/delete/:id", restrict, async (req, res, next) => {
  try {
    const id = req.params.id
    await Stories.deleteStory(id)
    res.status(202).json({ message: "Story is gone" })
  } catch (err) {
    next(err)
  }
})

module.exports = router;
