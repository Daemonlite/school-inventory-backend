import sendMail from "./Nodemailer.js";
import Product from "../models/Product.js";
import User from "../models/Users.js";

const DAYS_BEFORE_EXPIRY_WARNING = 7;

export const notifyProductsThatShouldBeOrdered = async () => {
  try {
    const products = await Product.find({
      $expr: { $lte: ["$quantity", "$minQuantity"] },
      minQuantity: { $gt: 0 },
    });

    if (products.length === 0) {
      console.log("No products need reordering.");
      return;
    }

    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      console.log("No admin user found.");
      return;
    }

    const adminEmail = admin.email;

    await Promise.allSettled(
      products.map((product) => {
        const subject = `Low Stock Alert: ${product.name}`;
        const content = `
          <h2>Low Stock Alert</h2>
          <p>The following product needs to be reordered:</p>
          <ul>
            <li><strong>Product:</strong> ${product.name}</li>
            <li><strong>Current Quantity:</strong> ${product.quantity}</li>
            <li><strong>Minimum Quantity:</strong> ${product.minQuantity}</li>
          </ul>
          <p>Please reorder this product as soon as possible.</p>
        `;
        return sendMail(adminEmail, content, subject).then(() =>
          console.log(`Reorder notification sent for: ${product.name}`),
        );
      }),
    );
  } catch (error) {
    console.error("Error sending reorder notifications:", error);
  }
};

export const notifyExpiredProducts = async () => {
  try {
    const now = new Date();
    const warningDate = new Date();
    warningDate.setDate(now.getDate() + DAYS_BEFORE_EXPIRY_WARNING);

    // Fetch expired and expiring-soon products in one query
    const products = await Product.find({
      expirationDate: { $lt: warningDate },
    });

    if (products.length === 0) {
      console.log("No expired or expiring products found.");
      return;
    }

    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      console.log("No admin user found.");
      return;
    }

    const adminEmail = admin.email;

    await Promise.allSettled(
      products.map((product) => {
        const isExpired = product.expirationDate < now;
        const formattedDate = product.expirationDate.toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        );

        const subject = isExpired
          ? `Expired Product: ${product.name}`
          : `Expiring Soon: ${product.name}`;

        const content = `
          <h2>${isExpired ? "Product Expired" : "Product Expiring Soon"}</h2>
          <p>The following product ${isExpired ? "has expired" : `will expire in less than ${DAYS_BEFORE_EXPIRY_WARNING} days`}:</p>
          <ul>
            <li><strong>Product:</strong> ${product.name}</li>
            <li><strong>Expiration Date:</strong> ${formattedDate}</li>
            <li><strong>Status:</strong> ${isExpired ? "❌ Expired" : "⚠️ Expiring Soon"}</li>
          </ul>
          <p>Please ${isExpired ? "remove" : "review"} this product as soon as possible.</p>
        `;

        return sendMail(adminEmail, content, subject).then(() =>
          console.log(
            `${isExpired ? "Expired" : "Expiring soon"} notification sent for: ${product.name}`,
          ),
        );
      }),
    );
  } catch (error) {
    console.error("Error sending expiry notifications:", error);
  }
};
