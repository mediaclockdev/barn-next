import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    wp_id: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: false
    },
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    display_name: {
        type: String,
        required: false
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
