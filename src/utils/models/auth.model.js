import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user"
    },
    isActive: {
        type: String,
        required: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String,
        default: Date.now().toString()
    },
    tokenExpiryDate: {
        type: Date,
        required: true,
        default: Date.now().toString()
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;