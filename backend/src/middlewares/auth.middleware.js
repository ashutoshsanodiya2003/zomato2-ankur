const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.models");
const userModel = require("../models/user.model");

function extractToken(req) {
  // const authHeader = req.headers?.authorization || req.headers?.Authorization;
  const authHeader = req.cookies.token;
  
  if (
    authHeader &&
    typeof authHeader === "string" &&
    authHeader.startsWith("Bearer ")
  ) {
    return authHeader.split(" ")[1];
  }
  // fallback to cookie 
  console.log(req.cookies)
  return req.cookies?.token;
}

async function authFoodPartnerMiddleware(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded._id || decoded.id;
    const foodPartner = await foodPartnerModel.findById(id);

    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

async function authUserMiddleware(req, res, next) {

  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded._id || decoded.id;
    const user = await userModel.findById(id);

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
