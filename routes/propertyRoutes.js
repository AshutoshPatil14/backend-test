// routes/propertyRoutes.js
import express from "express";
import {
  createProperty,
  getTopProperties,
  filterProperties,
} from "../controller/propertyController.js";
import propertyMiddleware from "../middleware/propertyMiddleware.js";

const propertyRouter = express.Router();

propertyRouter.post("/create", propertyMiddleware, createProperty);
propertyRouter.get("/top", getTopProperties);
propertyRouter.get("/", filterProperties);

export default propertyRouter;
