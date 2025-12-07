import mongoose from "mongoose";
import Booking from "../models/bookingSchema.js";
import Property from "../models/propertySchema.js";

export const createBooking = async (req, res) => {
  const { propertyId, userId, startDate, endDate } = req.body;

  if (!propertyId || !userId || !startDate || !endDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end - start;
    const nights = diffMs / (1000 * 60 * 60 * 24);

    if (!Number.isFinite(nights) || nights <= 0) {
      return res
        .status(400)
        .json({ message: "endDate must be after startDate" });
    }

    const totalPrice = nights * property.pricePerNight;

    const booking = new Booking({
      propertyId,
      userId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: "booked",
    });

    await booking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOwnerBookings = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const bookings = await Booking.aggregate([

      {
        $lookup: {
          from: "properties",
          localField: "propertyId",
          foreignField: "_id",
          as: "property",
        },
      },
      { $unwind: "$property" },


      {
        $match: {
          "property.ownerId": new mongoose.Types.ObjectId(ownerId),
        },
      },


      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },


      {
        $group: {
          _id: "$propertyId",
          propertyTitle: { $first: "$property.title" },
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
          customers: { $addToSet: "$customer.name" },
        },
      },

      { $sort: { totalRevenue: -1 } },
    ]);

    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
