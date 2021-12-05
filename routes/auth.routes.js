const { response } = require("express");
const Router = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router();
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

router.post(
  "/register",
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
        return res.status(400).json({ msg: errors });
      }

      const { login, password, first_name, last_name } = req.body;

      const users = await db.query("SELECT * FROM users where login = $1", [
        login,
      ]);
      if (users.rowCount == 0) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newPerson = await db.query(
          "INSERT INTO public.users(first_name, last_name, login, password)	VALUES ( $1, $2, $3, $4);",
          [first_name, last_name, login, hashedPassword]
        );
        return res
          .status(201)
          .json({ message: "Пользователь успешно создан!!" });
      } else {
        return res
          .status(400)
          .json({ message: "Пользователь с таким Логином существует!!" });
      }
    } catch (e) {
      res.status(400).json({ message: "Oh my, It's broken " + e.message });
    }
  }
);

router.post(
  "/login",
  [check("password", "Не пустой").exists()],
  async (req, res) => {
    try {
      const { login, password } = req.body;
      const user = await db.query("SELECT * FROM users WHERE login = $1", [
        login,
      ]);
      if (user.rowCount == 0) {
        return res
          .status(400)
          .json({ message: "Пользователя с таким Логином не сущесвует!" });
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: "Пароль не верный!" });
      }
      const token = jwt.sign(
        { userId: user.rows[0].id },
        config.get("jwtSecret"),
        { expiresIn: "2h" }
      );
      res.json({
        token,
        userId: user.rows[0].id,
        userLogin: user.rows[0].login,
        IsAdmin: user.rows[0].is_admin,
      });
    } catch (e) {
      return res.status(400).json({ message: "Ошибка" });
    }
  }
);

module.exports = router;
