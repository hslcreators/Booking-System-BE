import BookingService from "../services/bookings.js";
import SpaceService from "../services/Space.js";
import UserService from "../services/User.js";

const bookingService = new BookingService();
const userService = new UserService()
const spaceservice = new SpaceService()

export const RegisterBookingController = async (req, res) => {
    try {
        const { 
            user, 
            space, 
            eventTitle, 
            eventDescription, 
            startTime, 
            endTime, 
            totalAmount 
        } = req.body;

        if (!user || !space || !eventTitle || !startTime || !endTime || totalAmount === undefined) {
            return res.status(400).json({ 
                success: false,
                message: "Missing required fields",
                required: ['user', 'space', 'eventTitle', 'startTime', 'endTime', 'totalAmount']
            });
        }

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid user ID format" 
            });
        }

        if (!mongoose.Types.ObjectId.isValid(space)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid space ID format" 
            });
        }

        const startDateTime = new Date(startTime);
        const endDateTime = new Date(endTime);
        const now = new Date();

        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid date format. Please use ISO 8601 format" 
            });
        }

        if (startDateTime < now) {
            return res.status(400).json({ 
                success: false,
                message: "Cannot book in the past" 
            });
        }

        if (endDateTime <= startDateTime) {
            return res.status(400).json({ 
                success: false,
                message: "End time must be after start time" 
            });
        }

        const userExists = await userService.getUserById(user);
        if (!userExists) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }

        const spaceExists = await spaceservice.getSpaceById(space);
        if (!spaceExists) {
            return res.status(404).json({ 
                success: false,
                message: "Space not found" 
            });
        }

        const durationInHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
        if (durationInHours > 24 || durationInHours < .5) {
            return res.status(400).json({ 
                success: false,
                message: "Booking duration cannot exceed 24 hours" 
            });
        }

        const bookingData = {
            user,
            space,
            eventTitle: eventTitle,
            eventDescription: eventDescription,
            startTime: startDateTime,
            endTime: endDateTime,
            totalAmount: parseFloat(totalAmount)
        };

        const booking = await bookingService.Register_Booking(bookingData);
        if (!booking) throw new Error("Error Creating Booking")
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (error) {
        return res.status(500).json({ 
            success: false,
            message: error.message || "An error occurred while creating the booking"
        });
    }
};

export const FetchBookingController = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10,
            sort,
            ...filters 
        } = req.query;

        const pageNumber = parseInt(page);
        const itemsPerPage = parseInt(limit);
        
        if (pageNumber < 1 || itemsPerPage < 1) {
            throw new Error("Page and limit must be positive numbers");
        }

        // Parse Sort Option
        let sortOptions = {};
        if (sort) {
            sortOptions = sort.split(',').reduce((acc, sortItem) => {
                const order = sortItem.startsWith('-') ? -1 : 1;
                const field = sortItem.replace(/^[+-]/, '');
                acc[field] = order;
                return acc;
            }, {});
        }

        let queryFilters = {};
        
        if (filters.startDate) {
            queryFilters.startTime = { $gte: new Date(filters.startDate) };
            delete filters.startDate;
        }
        if (filters.endDate) {
            queryFilters.endTime = { $lte: new Date(filters.endDate) };
            delete filters.endDate;
        }

        const validFields = ['user', 'space', 'eventTitle', 'paymentStatus', 'totalAmount'];
        validFields.forEach(field => {
            if (filters[field]) {
                if (field === 'user' || field === 'space') {
                    if (mongoose.Types.ObjectId.isValid(filters[field])) {
                        queryFilters[field] = new mongoose.Types.ObjectId(filters[field]);
                    }
                } else if (field === 'totalAmount') {
                    queryFilters[field] = parseFloat(filters[field]);
                } else {
                    queryFilters[field] = filters[field];
                }
            }
        });



        const bookings = await bookingService.getBookings({
            page: pageNumber,
            limit: itemsPerPage,
            sort: sortOptions,
            filters: queryFilters
        });

        if (!bookings) throw new Error("Error Fetching Bookings")
        
        res.status(200).json({
            data: bookings.data,
            pagination: {
                currentPage: pageNumber,
                itemsPerPage,
                totalItems: bookings.total,
                totalPages: Math.ceil(bookings.total / itemsPerPage)
            }
        });

    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
}

export const updateBookingController = async (req, res) => {
    try {
        let {
            data
        } = req.body

        let id = req.params.id

        if (!id || !data) return res.status(400).json({ message: "Invalid request"})

        const booking = await bookingService.updateBooking(id, data)

        if (!booking) throw new Error("Error Updating Booking")
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({message: error.message });
    }
}

export const deleteBookingController = async (req, res) => {
    try {
        let { id } = req.params.id

        if (!id) return res.status(400).json({ message: "Invalid input data" });

        const booking = await bookingService.deleteBooking(id)
        if (!booking) throw new Error("Error Deleting Booking")
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({message: error.message });
    }
}