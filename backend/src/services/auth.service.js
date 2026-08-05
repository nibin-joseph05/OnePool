const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateToken } = require("../utils/jwt");

const register = async (data) => {
  const { name, email, password, phone } = data;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  return {
    user,
    token: generateToken(user.id),
  };
};

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const userResponse = user.toJSON();
  delete userResponse.password;

  return {
    user: userResponse,
    token: generateToken(user.id),
  };
};

module.exports = {
  register,
  login,
};