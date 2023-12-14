import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res.status(401).send({
      resultCode: -1,
      message: "Unauthorized: Token not provided",
    });
  }

  const token = tokenHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "my secret key");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).send({
      resultCode: -1,
      message: "Unauthorized: Invalid token",
      token: token,
    });
  }
};

export default verifyToken;
