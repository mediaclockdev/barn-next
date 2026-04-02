import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    items: [
        {
            product_id: {
                type: Number
            },
            quantity: {
                type: Number
            }
        }
    ],
    updated_at: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    });

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);