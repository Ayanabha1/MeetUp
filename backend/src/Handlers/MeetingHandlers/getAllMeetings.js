const connectToDatabase = require("../../Database/db");
const Meetings = require("../../Models/Meetings");
const { sendError, sendResponse } = require("../../Utils/response");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectToDatabase();
  } catch (err) {
    return sendError(err?.statusCode, err);
  }

  try {
    const allMeetings = await Meetings.find();

    return sendResponse({ meetings: allMeetings, message: "success" });
  } catch (err) {
    return sendError(err?.statusCode, err);
  }
};
