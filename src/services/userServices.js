const User = require('../models/User');

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

module.exports = {
  getUserById,
};