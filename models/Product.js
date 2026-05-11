import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    /*
    
        add a field min_quantity to raise alert

    */
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
    },
    minQuantity: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", ProductSchema);
export default Product