import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res.status(401).send({
      statusCode: 0,
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
      statusCode: 0,
      message: "Unauthorized: Invalid token",
      token: token,
    });
  }
};
