import express from "express";
import { createBooking, getOwnerBookings } from "../controller/bookingController.js";
import bookingMiddleware from "../middleware/bookingMiddleware.js";


const bookingRouter = express.Router();

bookingRouter.post("/create", createBooking);

bookingRouter.post("/owner/:ownerId/bookings", getOwnerBookings);


export default bookingRouter;
