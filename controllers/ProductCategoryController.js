import ProductCategory from "../models/ProductCategory.js";

export const getAllProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.aggregate([
      {
        $lookup: {
          from: "products", // must match your MongoDB collection name
          let: { categoryId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$category", "$$categoryId"] }
              }
            },
            {
              $group: {
                _id: null,
                total_products: { $sum: 1 },
                total_value: { $sum: "$price" } // change if you use quantity * price
              }
            }
          ],
          as: "stats"
        }
      },
      {
        $addFields: {
          productCount: {
            $ifNull: [{ $arrayElemAt: ["$stats.total_products", 0] }, 0]
          },
          totalValue: {
            $ifNull: [{ $arrayElemAt: ["$stats.total_value", 0] }, 0]
          }
        }
      },
      {
        $project: {
          stats: 0 // remove stats array from response
        }
      }
    ]);

    res.status(200).json(categories);
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