import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "User is not authorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { user_id, userName } = decoded;
    console.log("Decoded token:", decoded);

    if (!user_id || !userName) {
      console.log("User ID or username not found in decoded token");
      return res
        .status(401)
        .json({ message: "User ID or username not found in token" });
    }

    console.log(("Decoded user:", decoded));

    req.user = { user_id, userName };

    next();
  });
};

export default authUser;
