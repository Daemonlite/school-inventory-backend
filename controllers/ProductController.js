import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .sort({ createdAt: -1 }); 

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, category,price,quantity,minQuantity,expirationDate } = req.body;

        console.log(req.body)

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        if (!price) {
            return res.status(400).json({ message: "Price is required" });
        }

        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }

        if(!minQuantity){
            return res.status(400).json({ message: "Minimum Quantity required" });
        }

        const productCategory = await ProductCategory.findById(category);
        if (!productCategory) {
            return res.status(400).json({ message: "Invalid product category" });
        }
        const product = new Product({ name, description, category: productCategory,price,quantity,minQuantity,expirationDate });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, category,price,quantity,minQuantity,expirationDate } = req.body;
        const productCategory = await ProductCategory.findById(category);
        if (!productCategory) {
            return res.status(400).json({ message: "Invalid product category" });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, category: productCategory,price,quantity,minQuantity,expirationDate }, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};