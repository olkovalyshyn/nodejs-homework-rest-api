const User = require('./shemas/shema-user');

const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async id => {
  return await User.findOne({ _id: id });
};

const findByVerificationToken = async verificationToken => {
  return await User.findOne({ verificationToken });
};

const addUser = async ({
  email,
  password,
  subscription,
  token,
  verify,
  verificationToken,
}) => {
  const user = new User({
    email,
    password,
    subscription,
    token,
    verify,
    verificationToken,
  });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateVerificationToken = async (id, verify, verificationToken) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { verify, verificationToken },
  );
};

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findByEmail,
  findById,
  findByVerificationToken,
  addUser,
  updateToken,
  updateVerificationToken,
  updateAvatar,
};
