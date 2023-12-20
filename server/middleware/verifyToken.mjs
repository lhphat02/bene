import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token:", token);
  if (!token) {
    return res.status(401).send({
      resultCode: -1,
      message: "Unauthorized: Token not provided",
      data: null,
    });
  }

  jwt.verify(token, "your_secret_key", (error, decoded) => {
    if (error) {
      console.error("Token Verification Error:", error);
      return res.status(401).send({
        resultCode: -1,
        message: "Unauthorized: Invalid token",
        data: null,
      });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;
