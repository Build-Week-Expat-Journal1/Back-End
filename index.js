const express = require("express");

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const storiesRouter = require("./stories/storiesRouter");
const usersRouter = require("./users/userRouter");

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(express.json());

server.use("/stories", storiesRouter);
server.use("/users", usersRouter);
server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong",
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
  });
}
module.exports = server;
