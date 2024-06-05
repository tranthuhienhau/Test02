import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        salt: String
    }
})
const UserModel = mongoose.model("users", userSchema)
export default UserModel;
