const jwt_decode = require("jwt-decode");
const connectToDatabase = require("../../Database/db");
const userModel = require("../../Models/User");
const validateUser = require("../../Controllers/ValidateUser");
const { sendError, sendResponse } = require("../../Utils/response");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // connect to db
    const db = await connectToDatabase();

    const token = event.headers.authorization.split("Bearer ")[1];
    const userId = validateUser(token);
    if (!userId) {
      return sendError(400, { message: "User not signedin" });
    }

    const targetUser = await userModel.findOne({ _id: userId });
    const meetingHistory = targetUser?.meetings;

    return sendResponse({ meetings: meetingHistory, message: "success" });
  } catch (error) {
    return sendError(error?.statusCode, error);
  }
};
