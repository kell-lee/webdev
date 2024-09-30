import express from "express";

import { requireAuth, prisma } from "../apiConstant.js";

const router = express.Router();

// endpoint to get a specific user
router.get("/users/:id", async (req, res) => {
  const { id: auth0Id } = req.params;
  try {
    const users = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Failed to get this user profile." });
  }
});

// Endpoint to get all user profiles
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.User.findMany({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Failed to get all user profiles." });
  }
});

// Endpoint to verify user and create new user if not exists
router.post("/verify-user", requireAuth, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/name`];

    const user = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (user) {
      res.json(user);
    } else {
      const newUser = await prisma.user.create({
        data: { email, auth0Id, name },
      });
      res.json(newUser);
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying user." });
  }
});

// endpoint to update a user
router.put("/users/:id", requireAuth, async (req, res) => {
  const { id: auth0Id } = req.params;
  const { newPreference } = req.body;

  if (!newPreference) {
    return res.status(400).json({ error: "new preference is required" });
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { auth0Id: auth0Id },
      data: {
        preference: newPreference,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error updating user.",
      error: "Error updating user.",
      auth0Id: auth0Id,
      newPreference: newPreference,
    });
  }
});

// endpoint to delete a user
router.delete("/users/:id", requireAuth, async (req, res) => {
  const { id: auth0Id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        auth0Id: auth0Id,
      },
    });

    if (!user) {
      res.status(204).send();
      return;
    }

    console.log(user);
    const deletedUser = await prisma.user.delete({
      where: {
        auth0Id: auth0Id,
      },
    });
    console.log(deletedUser);
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
});
export default router;
