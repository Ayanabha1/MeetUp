const jwt_decode = require("jwt-decode");

const validateUser = (token) => {
  try {
    const userDetails = jwt_decode(token);
    const userId = userDetails.data._id;
    return userId;
  } catch (err) {
    return null;
  }
};

module.exports = validateUser;
