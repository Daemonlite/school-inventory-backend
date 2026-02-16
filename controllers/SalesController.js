import Sales from "../models/Sales.js";    
import Product from "../models/Product.js";
import User from "../models/Users.js";


export const getAllSales = async (req, res) => {
    try {
        const sales = await Sales.find().populate("product").populate("salesPerson");
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getSalesById = async (req, res) => {
    try {
        const sales = await Sales.findById(req.params.id).populate("product").populate("salesPerson");
        if (!sales) {
            return res.status(404).json({ message: "Sales not found" });
        }
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getSalesByUserId = async (req, res) => {
    try {
        const sales = await Sales.find({ salesPerson: req.params.id }).populate("product").populate("salesPerson");
        if (!sales) {
            return res.status(404).json({ message: "Sales not found" });
        }
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const createSales = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        
        if (!product || !quantity) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const salesPerson = req.user._id;
        
        const existingSalesPerson = await User.findById(salesPerson);
        if (!existingSalesPerson) {
            return res.status(404).json({ message: "Sales person not found" });
        }

        if (existingProduct.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient quantity" });
        }

        existingProduct.quantity -= quantity;
        await existingProduct.save();

        
        const sales = new Sales({ product, quantity, salesPerson });
        await sales.save();
        res.status(201).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateSales = async (req, res) => {
    try {
        const { product, quantity, salesPerson } = req.body;
        const sales = await Sales.findByIdAndUpdate(req.params.id, { product, quantity, salesPerson }, { new: true });
        if (!sales) {
            return res.status(404).json({ message: "Sales not found" });
        }
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteSales = async (req, res) => {
    try {
        const sales = await Sales.findByIdAndDelete(req.params.id);
        if (!sales) {
            return res.status(404).json({ message: "Sales not found" });
        }
        res.status(200).json({ message: "Sales deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};