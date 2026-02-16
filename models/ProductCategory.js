import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);
export default ProductCategory;