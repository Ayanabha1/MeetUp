const mongoose = require("mongoose");
let cachedDbConn = null;

module.exports = connectToDatabase = async () => {
  if (cachedDbConn === null) {
    console.log("Creating new mongodb connection");
    const uri = process.env.DB_URI;
    cachedDbConn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    return cachedDbConn;
  }

  console.log("Connection already established ... reusing the connection");
  return cachedDbConn;
};
