import express from "express";

const router = express.Router();

import { requireAuth, prisma } from "../apiConstant.js";

// endpoint to get all orders
router.get("/orders", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  try {
    const user = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id,
      },
      include: {
        orderHistory: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(user.orderHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting order history" });
  }
});

// endpoint to create an order
router.post("/orders", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const { productId } = req.body;

  if (!productId) {
    res.status(400).send("product is required.");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id,
      },
    });

    const orderHistory = await prisma.orderHistory.findFirst({
      where: {
        userId: user.id,
        productId: productId,
      },
    });

    if (!orderHistory) {
      console.log("not found");
      const newHistory = await prisma.orderHistory.create({
        data: {
          user: { connect: { id: user.id } },
          product: {
            connect: { id: productId },
          },
        },
      });

      res.json(newHistory);
    } else {
      console.log("found");
      res.json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding to cart" });
  }
});

// endpoint to update an order
router.put("/orders/:id", requireAuth, async (req, res) => {
  const { id: id } = req.params;
  const { newProduct } = req.body;

  if (!newPreference) {
    return res.status(400).json({ error: "new preference is required" });
  }
  try {
    const updatedOrder = await prisma.user.update({
      where: { id: id },
      data: {
        product: newProduct,
      },
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error updating order.",
    });
  }
});

// endpoint to delete an order
router.delete("/orders/:id", requireAuth, async (req, res) => {
  const { id: orderId } = req.params;

  if (!orderId) {
    return res.status(401).send("Product ID is required");
  }

  const auth0Id = req.auth.payload.sub;
  try {
    // find user using auth0Id
    const user = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id,
      },
    });

    const deletedOrderHistory = await prisma.orderHistory.delete({
      where: {
        // id: orderHistory.id,
        id: parseInt(orderId),
      },
    });
    res.json(deletedOrderHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

export default router;
