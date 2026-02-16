import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        default: "user",
        enum: ["sales-person", "admin"],
    }
});

const User = mongoose.model("User", UserSchema);
export default User;