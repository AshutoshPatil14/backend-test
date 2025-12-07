import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["booked", "cancelled"],
    default: "booked",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

// propertyId (ref → Property)
// userId (ref → User)
// startDate
// endDate
// totalPrice
// status ("booked" / "cancelled")
