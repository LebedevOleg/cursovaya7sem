const { response } = require("express");
const Router = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router();
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

// */api/user/getFirstName
router.post("/getFirstName", async (req, res) => {
  const { id } = req.body;
  try {
    const firstName = await db.query(
      "SELECT  first_name FROM public.users where id = $1",
      [id]
    );
    res.json(firstName.rows[0].first_name);
  } catch (e) {
    res.json(e.message);
  }
});
// */api/user/getLastName
router.post("/getLastName", async (req, res) => {
  const { id } = req.body;
  try {
    const firstName = await db.query(
      "SELECT  last_name FROM public.users where id = $1",
      [id]
    );
    res.json(firstName.rows[0].last_name);
  } catch (e) {
    res.json(e.message);
  }
});
// */api/user/getUserOrders
router.get("/getUserOrders", auth, async (req, res) => {
  try {
    const userId = req.userAuth.userId;
    const orders = await db.query(
      "SELECT orders.id, user_id, orders.price, rooms.name as room_name, date_on, date_out, status, date_set, buildings.name as build FROM orders left join build_to_rooms on orders.room_id = build_to_rooms.room_id left join rooms on rooms.id = build_to_rooms.room_id left join buildings on build_to_rooms.build_id= buildings.id where user_id = $1",
      [userId]
    );
    for (i = 0; i < orders.rowCount; i++) {
      if (new Date(orders.rows[i].date_out) < new Date(Date.now())) {
        await db.query("update orders set status = true where id = $1", [
          orders.rows[i].id,
        ]);
        orders.rows[i].status = true;
      }
    }
    res.status(201).json(orders.rows);
  } catch (e) {
    res.json(e.message);
  }
});

router.get("/getAllOrders", auth, async (req, res) => {
  try {
    const userId = req.userAuth.userId;
    const orders = await db.query(
      "SELECT orders.id, orders.price, users.id as uID, users.first_name,users.last_name, rooms.name as room_name, date_on, date_out, status, date_set, buildings.name as build FROM orders left join build_to_rooms on orders.room_id = build_to_rooms.room_id left join rooms on rooms.id = build_to_rooms.room_id left join buildings on build_to_rooms.build_id= buildings.id left join users on user_id = users.id"
    );
    for (i = 0; i < orders.rowCount; i++) {
      if (new Date(orders.rows[i].date_out) < new Date(Date.now())) {
        await db.query("update orders set status = true where id = $1", [
          orders.rows[i].id,
        ]);
        orders.rows[i].status = true;
      }
    }
    res.status(201).json(orders.rows);
  } catch (e) {
    res.json(e.message);
  }
});

// */api/user/getUserMoney
router.get("/getUserMoney", auth, async (req, res) => {
  try {
    const userId = req.userAuth.userId;
    const money = await db.query("SELECT cash FROM users where id = $1", [
      userId,
    ]);

    res.status(201).json(money.rows[0]);
  } catch (e) {
    res.json(e.message);
  }
});
// */api/user/addUserMoney
router.post("/addUserMoney", auth, async (req, res) => {
  const userId = req.userAuth.userId;
  var { money } = req.body;
  const UMoney = await db.query("SELECT cash FROM users where id = $1", [
    userId,
  ]);
  money = Number(UMoney.rows[0].cash) + money;
  res.json();
  await db.query("update users set cash = $1 where id = $2", [money, userId]);
});

module.exports = router;
