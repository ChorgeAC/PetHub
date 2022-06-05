const router = require("express").Router();
const { addNewuser, getUser } = require("../controllers/user.controller");

router.post("/register", addNewuser);
router.post("/login", getUser);
module.exports = router;
