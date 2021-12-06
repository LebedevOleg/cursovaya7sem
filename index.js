const express = require("express");
const config = require("config");
const signRouter = require("./routes/auth.routes");
const RoomsRoutes = require("./routes/rooms.routes");
const UserInfo = require("./routes/users.routes");
const db = require("./db");
/* const userRouter = require("./routes/user.routes");
const signRouter = require("./routes/sign.routes"); */
//const forumRouter = require("./routes/forum.routes");

const PORT = config.get("port") || 5000;

const app = express();
app.use(express.json({ extended: true }));
app.use("/api/auth", signRouter);
app.use("/api/rooms", RoomsRoutes);
app.use("/api/user", UserInfo);

app.listen(PORT, () =>
  console.log(`server has been started!!!!!! on port ${PORT}`)
);
