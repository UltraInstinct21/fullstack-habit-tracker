const bcrypt = require('bcrypt');
const jwtUtil = require('../utils/jwt.ustil');
const userRepository = require('../repositories/user.repository');4
const passwordUtil = require('../utils/password.util');



exports.register = async (username, email, password) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await passwordUtil.hashPassword(password);

  const user = await userRepository.createUser({
    username,
    email,
    password: hashedPassword
  });

  return user._id;
};

exports.login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) { 
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return jwtUtil.generateToken(user);
};

