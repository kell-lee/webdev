import { auth } from "express-oauth2-jwt-bearer";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});
