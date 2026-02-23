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
        required: true,
    },
    customer:{
        type: String,
        required: true,
    },
    salesPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const Sales = mongoose.model("Sales", SalesSchema);
export default Sales;