const connectToDatabase = require("../../Database/db");
const jwt = require("jsonwebtoken");
const Meetings = require("../../Models/Meetings");
const validateUser = require("../../Controllers/ValidateUser");
const { sendError, sendResponse } = require("../../Utils/response");

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphanumeric = "0123456789abcdefghijklmnopqrstuvwxyz";

const generateRoomName = async () => {
  const randomChar = (characters) =>
    characters.charAt(Math.floor(Math.random() * characters.length));

  let randomString = randomChar(alphabet); // Start with an alphabet

  for (let i = 0; i < 9; i++) {
    // Append 9 more characters from the alphanumeric set
    randomString += randomChar(alphanumeric);
    if (i === 2 || i === 5) randomString += "-";
  }

  // check if a meeting exists with the generated meeting_id
  const stringExists = await Meetings.findOne({ meeting_id: randomString });
  if (stringExists) {
    console.log("Meeting id exists , generating new one");
    return generateRoomName();
  }

  return randomString;
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectToDatabase();
  } catch (err) {
    return sendError(err?.statusCode, err);
  }

  try {
    const token = event.headers.authorization.split("Bearer ")[1];
    const userId = validateUser(token);
    if (!userId) {
      return sendError(400, { message: "User not signedin" });
    }
    const meeting_id = await generateRoomName();
    const date = new Date();

    const newMeeting = new Meetings({
      meeting_id: meeting_id,
      admin_id: userId,
      participants: [],
      date: date,
    });
    const savedMeeting = await newMeeting.save();

    return sendResponse({
      meeting_id: meeting_id,
      message: "success",
    });
  } catch (err) {
    return sendError(err?.statusCode, err);
  }
};
