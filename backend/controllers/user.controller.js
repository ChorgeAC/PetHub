const User = require("../modules/user.module");

const addNewuser = async (req, res) => {
  const newUser = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  };
  try {
    const result = await User.create(newUser);
    res.status(200).send(result);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "Already Exists in DB",
      });
    }
  }
};

const getUser = async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName);
  try {
    const user = await User.findOne({ userName, password });
    if (user) {
      res.status(200).json({ userName: user.userName });
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    console.log("error");
  }
};

module.exports = {
  addNewuser: addNewuser,
  getUser: getUser,
};
