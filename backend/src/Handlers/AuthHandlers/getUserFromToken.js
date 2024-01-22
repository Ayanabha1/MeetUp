const jwt_decode = require("jwt-decode");

const getUserFromToken = (token) => {
  const decoded = jwt_decode(token);
  return decoded.data;
};

module.exports = getUserFromToken;
