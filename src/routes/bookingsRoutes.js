import express from 'express'
import { deleteBookingController, FetchBookingController, RegisterBookingController, updateBookingController } from '../controllers/BookingsController.js'
import { authenticateUserwebtoken } from '../middleware/authenticateToken.js'
import { isPermitted } from '../middleware/bookingPermission.js'
const bookingsRouter = express.Router()

bookingsRouter.use(express.json())

bookingsRouter.get('/', FetchBookingController)
bookingsRouter.post('/', authenticateUserwebtoken, RegisterBookingController)
bookingsRouter.put('/:id', authenticateUserwebtoken, isPermitted, updateBookingController)
bookingsRouter.delete('/:id', authenticateUserwebtoken, isPermitted, deleteBookingController)

export default bookingsRouter