import crypto from "crypto";

const SALT = process.env.SALT || "random_salt_string";

export const hashPassword = (password) => {
  return crypto.createHmac("sha256", SALT).update(password).digest("hex");
};

export const comparePassword = (inputPassword, hashedPassword) => {
  return hashPassword(inputPassword) === hashedPassword;
};
