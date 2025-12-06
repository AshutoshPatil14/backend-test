import express from 'express';
import { createProperty } from '../controller/propertyController.js';
import propertyMiddleware from '../middleware/propertyMiddleware.js';

const propertyRouter = express.Router();

propertyRouter.post("/create", propertyMiddleware, createProperty);


export default propertyRouter;