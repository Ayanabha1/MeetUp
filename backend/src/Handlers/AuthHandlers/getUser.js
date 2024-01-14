const jwt_decode = require("jwt-decode");
const { sendError, sendResponse } = require("../../Utils/response");

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const token = event.headers.authorization.split("Bearer ")[1];
    const decoded = jwt_decode(token);
    if (decoded?.data) {
      return sendResponse({ user: decoded?.data, message: "success" });
    } else {
      return sendError(404, { message: "User not found" });
    }
  } catch (error) {
    return sendError(error?.statusCode, error);
  }
};
