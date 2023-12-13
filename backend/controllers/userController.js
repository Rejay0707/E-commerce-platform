import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { authenticateUser,generateTokenResponse, createUser, userProfile, editUserProfile, getUsersByAdmin, getUser, deleteUser, EditUser } from '../Service/service.js';

// @desc  Auth user& get token
// @route POST/api/users/login
// @access Public
// const authUser=asyncHandler(async (req,res)=>{
//     const {email,password}=req.body;
//     const user=await User.findOne({email});
//     if(user && (await user.matchPassword(password))){
//         generateToken(res,user._id);
//         res.status(200).json({
//             _id:user._id,
//             name:user.name,
//             email:user.email,
//             isAdmin:user.isAdmin
//         });
//     }else{
//         res.status(401);
//         throw new Error('Invalid email or password');
    
//     }
//     console.log(authUser)

// });
// 

// @desc Auth & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
        generateTokenResponse(res, user);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
});
// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await createUser(name,email,password)
        generateTokenResponse(res,user);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
});
// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully'});
});
// @desc Get user profile
// @route  /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await userProfile(req);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
});
// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await editUserProfile(req,req.user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
});
// @desc Get Users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await getUsersByAdmin();
    res.status(200).json(users);
});
// @desc Get User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    const user = await getUser(req);
        res.status(200).json(user);
});
// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUsers = asyncHandler(async (req, res) => {
    const user = await deleteUser(req)
        res.status(200).json({ message: 'User deleted successfully'});
});
// @desc update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await EditUser(req)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
});




export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser,
};