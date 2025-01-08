import jwt from "jsonwebtoken";
import User from "../model/user_model.js";

export const authentication = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.userId);
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
