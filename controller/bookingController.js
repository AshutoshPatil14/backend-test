import Booking from "../models/bookingSchema.js";

export const createBooking = async (req, res) => {
  const { propertyId, userId, checkInDate, checkOutDate, totalPrice } = req.body;

  if (!propertyId || !checkInDate || !checkOutDate || !totalPrice) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!userId) return res.status(400).json({ message: "Cannot book without user ID" });

  try {
    const booking = new Booking({ propertyId, userId, checkInDate, checkOutDate, totalPrice });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOwnerBookings = async (req, res) => {
    const ownerId = req.params.ownerId;
    
    console.log(ownerId)

    try{
        const bookings = await Booking.aggregate([
            {
                $match: { propertyId: ownerId }
            },
            {
                $lookup: {
                    from: "properties",
                    localField: "propertyId",
                    foreignField: "_id",
                    as: "property"
                }
            },
            {
                $unwind: "$property"
            },
            {
                $project: {
                    _id: 1,
                    propertyId: 1,
                    userId: 1,
                    checkInDate: 1,
                    checkOutDate: 1,
                    totalPrice: 1,
                    propertyName: "$property.name",
                    propertyAddress: "$property.address"
                }
            }
        ])
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
 