import mongoose from "mongoose";    

const SalesSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    saleDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    customer:{
        type: String,
        required: true,
    },
    total:{
        type: Number,
        required: true,
    },
    salesPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        default: "cash",
    },
}, {
    timestamps: true,
});

const Sales = mongoose.model("Sales", SalesSchema);
export default Sales;