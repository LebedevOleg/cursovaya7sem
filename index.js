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

async function updateEmptyRoom() {
  const room = await db.query(
    "SELECT id, empty_check, date_in, date_out FROM rooms where date_in is not null and date_out is not null"
  );
  if (room.rowCount != 0) {
    for (i = 0; i < room.rowCount; i++) {
      await db.query(
        "UPDATE public.rooms	SET date_in=$1, date_out=$2	WHERE id =$3",
        [room.rows[i].date_in, room.rows[i].date_out, room.rows[i].id]
      );
    }
  }
}
updateEmptyRoom();
setInterval(updateEmptyRoom, 86400000);

app.listen(PORT, () =>
  console.log(`server has been started!!!!!! on port ${PORT}`)
);
