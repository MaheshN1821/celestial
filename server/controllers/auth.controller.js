import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req?.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ error: "FirstName, LastName, Password, Email are required!" });
  }

  try {
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res.status(409).json({ error: "Username already exists!" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      password: hashedPwd,
      email: email,
    });

    const result = await newUser.save();

    return res.status(201).json({ info: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try after few minutes!" });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req?.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }

  try {
    const userFound = await User.findOne({ email: email });

    if (!userFound) {
      return res.status(401).json({ error: "User does not exist!" });
    }

    const hashedPwd = userFound?.password;
    const match = await bcrypt.compare(password, hashedPwd);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }

    const accessToken = jwt.sign({ email: email }, process.env.SEC_ACC_TOK, {
      expiresIn: "30m",
    });

    const refreshToken = jwt.sign({ email: email }, process.env.SEC_REF_TOK, {
      expiresIn: 24 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const info = await User.findByIdAndUpdate(
      userFound._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );

    res.status(200).json({ accessToken: accessToken, info });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Down : try again later!" });
  }
};

const logoutController = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const findUser = await User.findOne({ refreshToken: refreshToken });

  if (!findUser) {
    res.clearCookie("refreshToken", {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.sensStatus(204);
  }

  try {
    const userFound = await User.findOne({ refreshToken: refreshToken });

    await User.findByIdAndUpdate(
      userFound._id,
      { refreshToken: "" },
      { new: true }
    );

    res.clearCookie("refreshToken", {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(204).json({ message: "Logout Successfull!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export { registerController, loginController, logoutController };
