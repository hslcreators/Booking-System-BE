import BookingService from "../services/bookings.js"

const bookingservice = new BookingService()

export const isPermitted = async (req, res, next) => {
    let bookingId = req.params.id
    let booking = await bookingservice.getBookingById(bookingId)
    if(booking._id != req.user.id) res.status(403).json({msg: "Not Permitted to Complete Action"})
    next()
}