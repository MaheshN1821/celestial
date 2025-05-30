import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ error: "Login Again" });
  }
  try {
    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.SEC_ACC_TOK, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Login Again" });
      }
      req.users = user;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Login Again" });
  }
};

export default verifyJWT;
