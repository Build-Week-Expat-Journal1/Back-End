const express = require('express');
const router = express.Router();
const Stories = require('./storiesModel');
const Users = require('../users/usersModel');
const restrict = require('../middleware/restrict');
// const validateUserId = require('../middleware/verifyUser');

router.get('/', restrict, async (req, res, next) => {
  try {
    const stories = await Stories.getAllStories();
    res.status(200).json(stories);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', restrict, async (req, res, next) => {
  try {
    const id = req.params.id;

    const stories = await Stories.getStoryById(id);
    if (!stories) {
      res.status(404).json({ message: 'Story not found' });
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

router.get('/:userid', restrict, async (req, res, next) => {
  try {
    //   troubleshoot only returning one record even where there is more
    // await Users.getUserById(req.params.id).then(user => {
    //   if (!user) {
    //     return res.status(404).json({ message: 'User Not found' });
    //   } else {
    //     Stories.getStoryByUserId(req.params.id).then(stories => {
    //       if (!stories) {
    //         return res
    //           .status(404)
    //           .json({ message: 'NO Stories for this user' });
    //       } else {
    //         return res.status(200).json(stories);
    //       }
    //     });
    //   }
    // });
    const user_id = req.params.id;
    const user = Users.getUserById(user_id);

    const stories = await Stories.getStoryByUserId(user.user_id);

    if (!stories) {
      res.status(404).json({ message: 'no stories found for this user' });
    }

    res.status(200).status(stories);
  } catch (err) {
    next(err);
  }
});

router.post('/add', restrict, async (req, res, next) => {
  try {
    const story = req.body;
    const newStory = await Stories.AddStory(story);
    res.status(201).json(newStory);
  } catch (err) {
    next(err);
  }
});

router.put('/update/:id', restrict, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { storyTitle, storyDate, story, img } = req.body;
    const newStory = await Stories.updateStory(id, {
      storyTitle,
      storyDate,
      story,
      img,
    });

    res.status(202).json(newStory);
  } catch (err) {
    next(err);
  }
});

router.delete('/delete/:id', restrict, async (req, res, next) => {
  try {
    const id = req.params.id;
    await Stories.deleteStory(id);
    res.status(202).json({ message: 'Story is gone' });
  } catch (err) {
    next(err);
  }
});

// function validateUserId(req, res, next) {
//   const id = req.params.userid;
//   Users.getUserById(id)
//     .then(user => {
//       if (user) {
//         req.user.id = user_id;
//         next();
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     })
//     .catch(error => {
//       res
//         .status(500)
//         .json({ error: 'The user information could not be retrieved.' });
//     });
// }

module.exports = router;
