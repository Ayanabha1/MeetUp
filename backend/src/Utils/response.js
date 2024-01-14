exports.sendResponse = (data) => {
  let res = {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "content-type": "application/json",
    },
  };
  return res;
};
exports.sendError = (statusCode, errorObj) => {
  let err = {
    statusCode: statusCode || 400,
    body: JSON.stringify(errorObj || { message: "Internal server error" }),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
  };
  return err;
};
