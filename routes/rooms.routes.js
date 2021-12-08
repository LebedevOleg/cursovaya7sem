const { response } = require("express");
const Router = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router();
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

// * /api/rooms/getFreeRooms
router.get("/getFreeRooms", async (req, res) => {
  try {
    const rooms = await db.query("SELECT * FROM rooms order by id");
    res.status(201).json(rooms.rows);
  } catch (e) {
    console.log(e.message);
  }
});
// * /api/rooms/getRoomReservDate
router.post("/getRoomReservDate", async (req, res) => {
  try {
    const { id } = req.body;
    const date = await db.query(
      "SELECT orders.date_on, orders.date_out FROM rooms, orders where orders.room_id  = rooms.id and rooms.id = $1",
      [id]
    );
    if (date.rowCount == 0) {
      return res.json([]);
    }
    return res.status(201).json(date.rows);
  } catch (e) {
    res.json(e.message);
  }
});

router.post("/getFreeRoomsFilter", async (req, res) => {
  try {
    if (!!req.body.build) {
      if (!!req.body.value) {
        const { value, build } = req.body;
        const rooms = await db.query(
          "SELECT rooms.* FROM rooms left join build_to_rooms on rooms.id = build_to_rooms.room_id left join buildings on build_to_rooms.build_id = buildings.id where rooms.size = $1 and buildings.name =$2 order by id",
          [value, build]
        );
        return res.status(201).json(rooms.rows);
      } else {
        const { build } = req.body;
        const rooms = await db.query(
          "SELECT rooms.* FROM rooms left join build_to_rooms on rooms.id = build_to_rooms.room_id left join buildings on build_to_rooms.build_id = buildings.id where and buildings.name =$1 order by id",
          [build]
        );
        return res.status(201).json(rooms.rows);
      }
    } else {
      const { value } = req.body;
      const rooms = await db.query(
        "SELECT * FROM rooms where size = $1 order by id",
        [value]
      );
      return res.status(201).json(rooms.rows);
    }
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
        await db.query("UPDATE public.users set cash=$1 WHERE id = $2", [
          cost1,
          users.rows[0].id,
        ]);
        const price =
          dayPrice * ((new Date(date_End) - new Date(date_Start)) / 86400000);
        await db.query(
          "INSERT INTO orders(user_id, room_id, date_on, date_out,price) VALUES ( $1, $2, $3, $4,$5)",
          [users.rows[0].id, room_id, date_Start, date_End, price]
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
        const price =
          dayPrice * ((new Date(date_End) - new Date(date_Start)) / 86400000);
        await db.query(
          "INSERT INTO orders(user_id, room_id, date_on, date_out,price) VALUES ( $1, $2, $3, $4,$5)",
          [newPerson.rows[0].id, room_id, date_Start, date_End, price]
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
// * /api/rooms/deleteOrder
router.post("/deleteOrder", auth, async (req, res) => {
  const userId = req.userAuth.userId;
  if (!!req.body.uID) {
    var { id, price, uID } = req.body;
    const UMoney = await db.query("SELECT cash FROM users where id = $1", [
      uID,
    ]);
    price = Number(UMoney.rows[0].cash) + price;
    console.log(price, typeof price);
    await db.query("update users set cash = $1 where id = $2", [price, uID]);
    await db.query("DELETE FROM public.orders WHERE id = $1", [id]);
    res.json({ message: "успешно удалено" });
  } else {
    var { id, price } = req.body;
    const UMoney = await db.query("SELECT cash FROM users where id = $1", [
      userId,
    ]);
    price = Number(UMoney.rows[0].cash) + price;
    console.log(price, typeof price);
    await db.query("update users set cash = $1 where id = $2", [price, userId]);
    await db.query("DELETE FROM public.orders WHERE id = $1", [id]);
    res.json({ message: "успешно удалено" });
  }
});

module.exports = router;
