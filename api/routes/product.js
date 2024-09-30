import express from "express";

const router = express.Router();

import { requireAuth, prisma } from "../apiConstant.js";

// Endpoint to get all products
router.get("/products", async (req, res) => {
  try {
    const products = await prisma.Product.findMany({});
    res.json(products);
    console.log("get product success");
  } catch (error) {
    res.status(400).json({ error: "Failed to get all products." });
  }
});

// endpoint to create products
router.post("/products", async (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: "No events data provided." });
  }

  try {
    await storeEvents(products);
    console.log("Events stored successfully");
  } catch (error) {
    console.error("Error storing events:", error);
    res.status(400).json({ error: "Failed to store events." });
  }
});

// endpoint to update a product
router.put("/products/:id", requireAuth, async (req, res) => {
  const { id: id } = req.params;
  const { newDescription } = req.body;

  if (!newDescription) {
    return res.status(400).json({ error: "new description is required" });
  }
  try {
    const updatedDescription = await prisma.product.update({
      where: { id: id },
      data: {
        description: newDescription,
      },
    });
    res.json(updatedDescription);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Error updating product description" });
  }
});

// endpoint to delete an product
router.delete("/products/:id", requireAuth, async (req, res) => {
  const { id: id } = req.params;

  if (!id) {
    return res.status(401).send("Product ID is required");
  }

  const auth0Id = req.auth.payload.sub;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

export default router;
