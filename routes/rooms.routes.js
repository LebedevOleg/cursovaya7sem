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
      "SELECT * FROM rooms where empty_check = false order by id"
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
      "SELECT * FROM rooms where empty_check = false and size = $1 order by id",
      [value]
    );
    res.json(rooms.rows);
  } catch (e) {
    console.log(e.message);
  }
});

  router.post("/resrveRoom", [check("password", "Минимальная длинна 3 символа")
  .trim()
  .isLength({ min: 3 }),
check("login", "не пустой").trim().notEmpty(),
check("first_name", "не пустой").trim().notEmpty(),
check("last_name", "не пустой").trim().notEmpty(),],async(req, res)=>{
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      console.log(errors)
      return res.status(400).json({ message: errors });
    }
    const { login, password, first_name, last_name, date_Start, date_End, room_id } = req.body;
    const users = await db.query("SELECT * FROM users where login = $1", [
      login,
    ]);
    if(users.rowCount == 1){
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: "Пароль не верный!" });
      }
      const price = await db.query("SELECT price_of_day FROM rooms where id = $1", [room_id])
      const userMoney = await db.query("select cash from users where id = $1", [users.rows[0].id])
      
      
      
      
      await db.query("")
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 12);
      const newPerson = await db.query(
        "INSERT INTO public.users(first_name, last_name, login, password)	VALUES ( $1, $2, $3, $4) RETURNING *;",
        [first_name, last_name, login, hashedPassword]
      );
      
    }
  }catch{}
})

module.exports = router;
