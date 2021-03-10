const User = require('./shemas/shema-user');

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async id => {
  return await User.findOne({ _id: id });
};

const addUser = async ({ email, password, subscription, token }) => {
  const user = new User({ email, password, subscription, token });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  updateToken,
};
