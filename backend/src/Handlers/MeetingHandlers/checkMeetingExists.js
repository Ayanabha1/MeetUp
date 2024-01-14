const connectToDatabase = require("../../Database/db");
const validateUser = require("../../Controllers/ValidateUser");
const Meetings = require("../../Models/Meetings");
const { sendError, sendResponse } = require("../../Utils/response");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const reqObj = JSON.parse(event.body);

  try {
    // connect to db
    const db = await connectToDatabase();
    const token = event.headers.authorization.split("Bearer ")[1];
    const userId = validateUser(token);
    const meeting_id = reqObj.meeting_id;
    if (!userId) {
      return sendError(400, { message: "User not signedin" });
    }

    if (!meeting_id) {
      return sendError(400, { message: "Meeting id not specified" });
    }

    // check if there is a valid meeting with given meeting_id
    const target_meeting = await Meetings.findOne({
      meeting_id: meeting_id,
    });

    if (!target_meeting) {
      return sendError(404, { message: "Invalid meeting id" });
    }

    return sendResponse({ message: "Meeting exists" });
  } catch (err) {
    return sendError(err?.statusCode, err);
  }
};
