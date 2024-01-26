const { sendError, sendResponse } = require("../../Utils/response");
const parser = require("lambda-multipart-parser");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const result = await parser.parse(event);
    if (result.files.length === 0) {
      return sendError(400, { message: "No file received" });
    }

    const file = result.files[0];

    const params = {
      Bucket: process.env.IMAGE_BUCKET_NAME,
      Key: "docs/" + Date.now(),
      Body: file.content,
      ContentType: file.contentType,
    };

    // // Upload the image to S3
    const s3Res = await s3.upload(params).promise();
    const fileUrl = s3Res.Location;

    return sendResponse({
      message: "File uploaded successfully",
      url: fileUrl,
    });
  } catch (err) {
    return sendError(err?.statusCode, { message: "Something went wrong" });
  }
};
