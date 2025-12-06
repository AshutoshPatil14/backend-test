import mongoose from 'mongoose';


const bookingSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    }
});

const Booking = mongoose.model('Booking', bookingSchema);


export default Booking;





// propertyId (ref → Property)
// userId (ref → User)
// startDate
// endDate
// totalPrice
// status ("booked" / "cancelled")