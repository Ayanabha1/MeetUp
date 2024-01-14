const connectToDatabase = require("../../Database/db");
const { registerValidation } = require("../../Validation/SchemaValidation");
const jwt = require("jsonwebtoken");
const userModel = require("../../Models/User");
const bcrypt = require("bcryptjs");
const { sendError, sendResponse } = require("../../Utils/response");

async function generateToken(data) {
  const token = await jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET
  );
  return token;
}

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectToDatabase();
  } catch (err) {
    return sendError(err.statusCode, err);
  }

  // Checking for validation wrt the schema defined
  const reqObj = JSON.parse(event.body);
  const { error } = registerValidation.validate(reqObj);
  if (error) {
    return sendError(400, { message: error.details[0].message });
  }
  try {
    // check if the user already exists in the db
    const userFound = await userModel.findOne({
      email: reqObj.email,
    });
    if (userFound) {
      return sendError(400, { message: "User already exists" });
    }

    // // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(reqObj.password, salt);

    // Creating a new user
    const trimmedName = reqObj.name.trim();
    const trimmedEmail = reqObj.email.trim();
    const user = new userModel({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPass,
    });

    const newUser = await user.save();
    // // Generate the jwt Token
    const _token = await generateToken(newUser);
    return sendResponse({
      user: newUser,
      message: "Signup success!",
      token: _token,
    });
  } catch (error) {
    return sendError(error?.statusCode, error);
  }
};
