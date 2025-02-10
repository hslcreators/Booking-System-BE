import { Bookings } from "../models/bookings.js";
class BookingsRepo{

    async createBooking(data) {
        try {
            // enforce all bookings must have initial status of "Pending"
            const booking = new Bookings(data)
            await booking.save()
            return booking
        } catch (error) {
            throw new Error(`Error creating Booking: ${error.message}`);
        }
    }
    async getBookings({ page, limit, sort, filters }) {
        try {
            const skip = (page - 1) * limit;
            
            let query = Bookings.find(filters);

            if (Object.keys(sort).length > 0) {
                query = query.sort(sort);
            }

            const data = await query
                .skip(skip)
                .limit(limit)
                .exec();

            const total = await Bookings.countDocuments(filters);

            return {
                data,
                total
            };

        } catch (error) {
            throw new Error(`Error fetching Bookings: ${error.message}`);
        }
    }



    async getallBookings(itemsPerPage, pageNo) {
        try {
            const skip = (pageNo - 1) * itemsPerPage;
            const bookings = await Bookings.find({})
                .skip(skip)
                .limit(itemsPerPage)
                .exec();
            return bookings
        } catch (error) {
            throw new Error(`Error fetching Bookings: ${error.message}`);
        }
    }
    
    async getBookingById(id) {
        try {
            const booking = Bookings.findById(id)
            if (booking) return booking
            throw new Error('Booking Not Found')
        } catch (error) {
            throw new Error(`Error fetching Bookings: ${error.message}`);
        }
    }

    async updateBookings(id, data) {
        try {
            const booking = await Bookings.updateOne(
                { _id: id },
                { $set: data }
            );            
            if (booking.matchedCount === 0) throw new Error('Booking not found');
            return booking;
        } catch (error) {
            throw new Error(`Error updating Bookings: ${error.message}`);
        }
    }

    async deleteBookings(id) {
        try {
            const deletedBooking = await Bookings.findByIdAndDelete(id)
            if (!deletedBooking) throw new Error("Booking not Found")
            return deletedBooking
        } catch (error) {
            throw new Error(`Error Deleting Bookings: ${error.message}`);
        }
    }
}

export default BookingsRepo