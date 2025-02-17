import jwt from "jsonwebtoken";
import User from "../model/user_model.js";
export const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};
