import express from "express";
import { createBooking, getOwnerBookings } from "../controller/bookingController.js";
import bookingMiddleware from "../middleware/bookingMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", bookingMiddleware, createBooking);

bookingRouter.get("/owner/:ownerId/bookings", getOwnerBookings);

export default bookingRouter;
