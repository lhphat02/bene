import jwt from "jsonwebtoken";

const createToken = (id) => {
  const jwttoken = jwt.sign({ id }, "my secret key", {
    expiresIn: 3 * 24 * 60 * 60,
  });
  return jwttoken;
};

export default createToken;
