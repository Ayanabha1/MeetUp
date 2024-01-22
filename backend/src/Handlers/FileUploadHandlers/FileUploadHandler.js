const connectToDatabase = require("../../Database/db");
const validateUser = require("../../Controllers/ValidateUser");
const { sendError, sendResponse } = require("../../Utils/response");
const users = require("../../Models/User");
const parser = require("lambda-multipart-parser");
const AWS = require("aws-sdk");
const getUserFromToken = require("../AuthHandlers/getUserFromToken");
const s3 = new AWS.S3();
const jwt = require("jsonwebtoken");

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
    // connect to db
    const db = await connectToDatabase();
    const token = event.headers.authorization.split("Bearer ")[1];
    const userId = validateUser(token);
    const userData = getUserFromToken(token);
    if (!userId) {
      return sendError(400, { message: "User not signedin" });
    }

    const result = await parser.parse(event);
    if (result.files.length === 0) {
      return sendError(400, { message: "No file received" });
    }

    const file = result.files[0];
    const fileName = file.filename;
    const fileExt = file.contentType.split("image/")[1];
    if (fileExt !== "png" && fileExt !== "jpg" && fileExt != "jpeg") {
      return sendError(400, { message: "Please upload .png/.jpg.jpeg file" });
    }
    const params = {
      Bucket: process.env.IMAGE_BUCKET_NAME,
      Key: "images/" + Date.now() + userId,
      Body: file.content,
      ContentType: file.contentType,
    };

    // // Upload the image to S3
    const s3Res = await s3.upload(params).promise();
    const imageUrl = s3Res.Location;
    await users.updateOne(
      { _id: userId },
      { $set: { profile_image: imageUrl } }
    );

    const newUserData = userData;
    newUserData.profile_image = imageUrl;

    const _token = await generateToken(newUserData);

    return sendResponse({
      message: "Image uploaded successfully",
      image: imageUrl,
      userData: newUserData,
      token: _token,
    });
  } catch (err) {
    return sendError(err?.statusCode, { message: "Something went wrong" });
  }
};
