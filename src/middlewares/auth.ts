const jwt = require("jsonwebtoken");
import InMemoryDataStorage from '../database';

// const config = process.env;

const verifyToken = (req : any, res : any, next : any) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, 'process.env.TOKEN_KEY');
    let user = InMemoryDataStorage.getUserById(decoded.user_id);
    req.user = decoded;
    // if (user.token === token) {
    //   req.user = decoded;
    // } else {
    //   return res.status(401).send("Invalid Token");
    // }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;