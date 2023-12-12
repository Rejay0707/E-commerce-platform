import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// Generate Token
const generateTokenResponse = (res, user) => {
  generateToken(res, user._id);
};
// For login
const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
};
// For Register
const createUser = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    return user;
  } else {
    throw new Error("Invalid user data");
  }
};
// User Profile
const userProfile = async (req) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return user;
  } else {
    throw new Error("User not found");
  }
};
// Update the User Profile
const editUserProfile = async (req, id) => {
  const user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    return user.save();
  } else {
    throw new Error("User not found");
  }
};
// Get Users
const getUsersByAdmin = async () => {
  return User.find({});
};
// Get User
const getUser = async (req) => {
  const user = await User.findById(req.params.id);
  if (user) {
    return user;
  } else {
    throw new Error("User not found");
  }
};
// deleteUser
const deleteUser = async (req) => {
    const user = await User.findById(req.params.id);
    if (user){
        if(user.isAdmin){
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({_id: user._id})
    } else {
        throw new Error('User not found');
    }
}
// Edit the User
const EditUser = async (req) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name ;
        user.email = req.body.email || user.email ;
        user.isAdmin = Boolean(req.body.isAdmin);
        return user.save();
    } else {
        throw new eRROR('User not found');
    }
}
export {
authenticateUser,
generateTokenResponse,
createUser,
userProfile,
editUserProfile,
getUsersByAdmin,
getUser,
deleteUser,
EditUser
};