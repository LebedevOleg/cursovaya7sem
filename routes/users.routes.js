const { response } = require("express");
const Router = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router();
const db = require("../db");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
module.exports = router;
