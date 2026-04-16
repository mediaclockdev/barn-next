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
            variation_id: {
                type: Number,
                default: 0
            },
            variation_name: {
                type: String,
                default: ""
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