import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
const generateToken = (res, userid) => {
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookies("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
export default generateToken;
