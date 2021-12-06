const { response } = require("express");
const Router = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router();
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// * /api/rooms/getFreeRooms
router.get("/getFreeRooms", async (req, res) => {
  try {
    const rooms = await db.query("SELECT * FROM rooms order by id");
    res.json(rooms.rows);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/getFreeRoomsFilter", async (req, res) => {
  try {
    const { value } = req.body;
    console.log(value);
    const rooms = await db.query(
      "SELECT * FROM rooms where size = $1 order by id",
      [value]
    );
    res.json(rooms.rows);
  } catch (e) {
    console.log(e.message);
  }
});
// * /api/rooms/resrveRoom
router.post(
  "/resrveRoom",
  [
    check("password", "Минимальная длинна 3 символа")
      .trim()
      .isLength({ min: 3 }),
    check("login", "не пустой").trim().notEmpty(),
    check("first_name", "не пустой").trim().notEmpty(),
    check("last_name", "не пустой").trim().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ message: errors });
      }
      const {
        login,
        password,
        first_name,
        last_name,
        date_Start,
        date_End,
        room_id,
        dayPrice,
      } = req.body;
      const users = await db.query("SELECT * FROM users where login = $1", [
        login,
      ]);

      if (users.rowCount == 1) {
        const isMatch = await bcrypt.compare(password, users.rows[0].password);
        if (!isMatch) {
          return res.status(400).json({ message: "Пароль не верный!" });
        }

        const userMoney = await db.query(
          "select cash from users where id = $1",
          [users.rows[0].id]
        );
        const cost1 =
          userMoney.rows[0].cash -
          dayPrice * ((new Date(date_End) - new Date(date_Start)) / 86400000);
        console.log(userMoney.rows[0].cash);
        await db.query("UPDATE public.users set cash=$1 WHERE id = $2", [
          cost1,
          users.rows[0].id,
        ]);
        console.log(typeof users.rows[0].id);
        await db.query(
          "INSERT INTO orders(user_id, room_id, date_on, date_out) VALUES ( $1, $2, $3, $4)",
          [users.rows[0].id, room_id, date_Start, date_End]
        );
        return res
          .status(201)
          .json({ message: "Комната успешно зарезервированна" });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newPerson = await db.query(
          "INSERT INTO public.users(first_name, last_name, login, password)	VALUES ( $1, $2, $3, $4) RETURNING *;",
          [first_name, last_name, login, hashedPassword]
        );
        const userMoney = await db.query(
          "select cash from users where id = $1",
          [newPerson.rows[0].id]
        );
        const cost2 =
          userMoney -
          dayPrice * ((new Date(date_End) - new Date(date_Start)) / 86400000);
        await db.query("UPDATE public.users set cash=$1 WHERE id = $2", [
          cost2,
          newPerson.rows[0].id,
        ]);
        await db.query(
          "INSERT INTO orders(user_id, room_id, date_on, date_out) VALUES ( $1, $2, $3, $4)",
          [newPerson.rows[0].id, room_id, date_Start, date_End]
        );
        return res
          .status(201)
          .json({ message: "Комната успешно зарезервированна" });
      }
    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e });
    }
  }
);

module.exports = router;
