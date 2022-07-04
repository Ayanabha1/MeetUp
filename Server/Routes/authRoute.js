const router = require("express").Router();
const bcrypt = require("bcrypt");
const UserModel = require("../Model/UserModel");
const {
  registerValidation,
  loginValidation,
} = require("../Validation/SchemaValidation");
const jwt = require("jsonwebtoken");

async function generateToken(data) {
  //   console.log("YO");
  //   console.log(data);
  const token = await jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET
  );
  return token;
}

// Register

router.post("/addUser", async (req, res) => {
  // Checking for validation wrt the schema defined
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // check if the user already exists in the db
  const userFound = await UserModel.findOne({
    email: req.body.email,
  });
  if (userFound) {
    return res.status(400).send({ message: "User already exists" });
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  //   Creating a new user
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    const newUser = await user.save();
    // Generate the jwt Token
    const _token = await generateToken(newUser);
    res.send({ user: newUser, message: "Signup success!", token: _token });
  } catch (err) {
    res.send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  // Checking for validation wrt the schema defined
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  // finding the user from the db
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).send({ message: "Invalid Login Credentials" });
  }

  // compare passwords
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send({ message: "Invalid Login Credentials" });
  }

  // Generate the jwt Token
  const _token = await generateToken(user);
  res.send({ user: user, message: "Login success!", token: _token });
});

module.exports = router;
