import ProductCategory from "../models/ProductCategory.js";

export const getAllProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.find();
        res.status(200).json(productCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getProductCategoryById = async (req, res) => {
    try {
        const productCategory = await ProductCategory.findById(req.params.id);
        if (!productCategory) {
            return res.status(404).json({ message: "Product category not found" });
        }
        res.status(200).json(productCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createProductCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }
        const productCategory = new ProductCategory({ name, description });
        await productCategory.save();
        res.status(201).json(productCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateProductCategory = async (req, res) => {
    try {
        
        const productCategory = await ProductCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!productCategory) {
            return res.status(404).json({ message: "Product category not found" });
        }
        res.status(200).json(productCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteProductCategory = async (req, res) => {
    try {
        const productCategory = await ProductCategory.findByIdAndDelete(req.params.id);
        if (!productCategory) {
            return res.status(404).json({ message: "Product category not found" });
        }
        res.status(200).json({ message: "Product category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};