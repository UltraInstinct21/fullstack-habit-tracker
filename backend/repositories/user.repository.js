const userModel = require('../models/users.model');

exports.findByEmail = async (email) => {
  return await userModel.findOne({ email });
};

exports.createUser = async (userData) => {
  return await userModel.create(userData);
};