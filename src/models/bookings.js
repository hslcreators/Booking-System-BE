import { Schema, model } from "mongoose";


const BookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    auditorium: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
    eventTitle: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
    },
    startTime: {
        type: Date,  // Full DateTime
        required: true 
    },
    endTime: {
        type: Date,    // Full DateTime
        required: true 
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Bookings = model("Booking", BookingSchema);
