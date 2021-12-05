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
    const rooms = await db.query(
      "SELECT id, name, empty_check, size FROM rooms where empty_check = false order by id"
    );
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
      "SELECT id, name, empty_check, size FROM rooms where empty_check = false and size = $1 order by id",
      [value]
    );
    res.json(rooms.rows);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
