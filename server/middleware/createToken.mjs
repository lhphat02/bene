import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, "my secret key", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default createToken;
