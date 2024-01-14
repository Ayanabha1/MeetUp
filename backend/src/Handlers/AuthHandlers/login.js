const connectToDatabase = require("../../Database/db");
const { loginValidation } = require("../../Validation/SchemaValidation");
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
    const reqObj = JSON.parse(event.body);

    // Checking for validation wrt the schema defined
    const { error } = loginValidation.validate(reqObj);
    if (error) {
      return sendError(400, { message: error.details[0].message });
    }

    // finding the user from the db
    const user = await userModel.findOne({
      email: reqObj.email,
    });

    if (!user) {
      return sendError(400, { message: "Invalid Login Credentials" });
    }
    // compare passwords
    const validPass = await bcrypt.compare(reqObj.password, user.password);
    if (!validPass) {
      return sendError(400, { message: "Invalid Login Credentials" });
    }

    // Generate the jwt Token
    const userObj = { _id: user._id, name: user.name, email: user.email };
    const _token = await generateToken(userObj);
    return sendResponse({
      user: userObj,
      message: "Login success!",
      token: _token,
    });
  } catch (error) {
    return sendError(error?.statusCode, error);
  }
};
