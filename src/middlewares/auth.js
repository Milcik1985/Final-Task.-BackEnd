import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "User is not authorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "User is not authorized" });
    }

    if (!decoded.user_id) {
      return res.status(401).json({ message: "User ID not found in token" });
    }

    console.log(("Decoded user:", decoded));
    req.user = { user_id: decoded.user_id };
    console.log(req.body.userId);
    next();
  });
};

export default authUser;
