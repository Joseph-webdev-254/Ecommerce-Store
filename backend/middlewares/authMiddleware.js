import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt cokkies
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (token) {
      res.status(401);
      throw new Error("Not  authorised,token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not  authorised , no token");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized  as an  admin");
  }
};
export { authenticate, authorizeAdmin };
