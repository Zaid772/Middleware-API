const { Router } = require("express");
const userRouter = Router();
const { registerUser, loginUser, listAllUsers, deleteUser, updatePassword } = require("../controllers/controllers");
const { hashPassword, passwordCheck, tokenCheck, emailValidation } = require("../middleware/index");

userRouter.post("/users/register", hashPassword, registerUser);
userRouter.post("/users/registerbyemail", emailValidation, registerUser)
userRouter.get("/users/login", passwordCheck, loginUser);
userRouter.get("/users/listallusers", tokenCheck, listAllUsers);
userRouter.delete("/users/deleteuser", tokenCheck, deleteUser);
userRouter.put("/users/updatepassword", updatePassword);

module.exports = userRouter;