const express = require("express");
const config = require("config");
const signRouter = require("./routes/auth.routes");
/* const userRouter = require("./routes/user.routes");
const signRouter = require("./routes/sign.routes"); */
//const forumRouter = require("./routes/forum.routes");

const PORT = config.get("port") || 5000;

const app = express();
app.use(express.json({ extended: true }));
app.use("/api/auth", signRouter);
//app.use("/api/forum", forumRouter);
//app.use("/api/data", userRouter);

app.listen(PORT, () =>
  console.log(`server has been started!!!!!! on port ${PORT}`)
);
