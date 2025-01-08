import { generateTokenAndSaveInCookies } from "../jwt/token.js";
import User from "../model/user_model.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: "User already Registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      return res
        .status(201)
        .json({ message: "User Registered Successful", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid email or Password" });
    }
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({ message: "User logged in Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in Logging user" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged Out Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Error in Logging Out" });
  }
};
