import mongoose from "mongoose";
import Property from "../models/propertySchema.js";
import Booking from "../models/bookingSchema.js";
import User from "../models/userSchema.js";

export const createProperty = async (req, res) => {
  const { title, location, pricePerNight, ownerId, amenities } = req.body;

  try {
    const property = new Property({
      title,
      location,
      pricePerNight,
      ownerId,
      amenities,
    });
    await property.save();
    res.status(201).json({ message: "Property created successfully", property });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getTopProperties = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: "$propertyId",
          numberOfBookings: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $lookup: {
          from: "properties",
          localField: "_id",
          foreignField: "_id",
          as: "property",
        },
      },
      { $unwind: "$property" },
      {
        $lookup: {
          from: "users",
          localField: "property.ownerId",
          foreignField: "_id",
          as: "owner",
        },
      },
      { $unwind: "$owner" },
      {
        $project: {
          _id: 0,
          title: "$property.title",
          ownerName: "$owner.name",
          numberOfBookings: 1,
          totalRevenue: 1,
        },
      },
      { $sort: { numberOfBookings: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 5. Filter properties
export const filterProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, amenities } = req.query;
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.pricePerNight = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    }

    if (amenities) {
      const amenityArr = amenities.split(",").map((a) => a.trim());
      filter.amenities = { $all: amenityArr };
    }

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
