import BookingsRepo from "../repositories/BookingsRepo.js";

class BookingService extends BookingsRepo{
    async Register_Booking(data){
        try {
            if (!data.space || !data.startTime || !data.endTime) {
                throw new Error("Missing required fields: space, startTime, endTime");
            }
            data.startTime = new Date(data.startTime)
            data.endTime = new Date(data.endTime)
            
            const isConflict = await this.isBookingConflicting(
                data.space,
                data.startTime,
                data.endTime
            );
            
            if (isConflict) throw new Error("Booking conflicts with existing paid booking");

            const bookingData = { 
                ...data, 
                paymentStatus: "pending"
            };
            return await this.createBooking(bookingData);
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`);
        }
    }

    async updateBooking(id, updateData) {
        try {
            const existingBooking = await this.getBookingById(id)
            if (updateData.startTime) updateData.startTime = new Date(data.startTime)
            if (updateData.endTime) updateData.endTime = new Date(data.endTime)

            if (!existingBooking) {
                throw new Error("Booking not found");
            }
    
            if (existingBooking.paymentStatus === "paid") {
                const restrictedFields = ["space", "startTime", "endTime"];
                const isChangingRestricted = restrictedFields.some(
                    field => updateData[field] !== undefined
                );
    
                if (isChangingRestricted) {
                    throw new Error("Cannot modify time or space for paid bookings");
                }
            }
    
            return this.updateBookings(id, updateData);
        } catch (error) {
            throw new Error(`Error Updating Booking: ${error.message}`);
        }
    }

    async deleteBooking(id) {
        try {
            const booking = await this.getBookingById(id)
            if (!booking) throw new Error("Booking not found");

            if (booking.paymentStatus === "paid") throw new Error("Cannot delete paid bookings");
    
            return this.deleteBookings(id);
        } catch (error) {
            throw new Error(`Error Deleting Booking: ${error.message}`);            
        }
    }

    async findPaidBookingsForspace(spaceId) {
        return Bookings.find({
          space: spaceId,
          paymentStatus: "paid",
        });
      }

    async isBookingConflicting(spaceId, startTime, endTime) {
        const bookings = await this.findPaidBookingsForspace(spaceId);
        return bookings.some(booking => 
            booking.startTime < endTime && booking.endTime > startTime
        );
    }
          
      
}

export default BookingService