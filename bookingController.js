const BookingService = require('../services/BookingService');

class BookingController {
    static async createBooking(req, res) {
        try {
            const { userId, driverId, pickupLocation, destination } = req.body;
            const booking = await BookingService.createBooking(userId, driverId, pickupLocation, destination);
            res.status(201).json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.getBooking(bookingId);
            if (!booking) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }
            res.status(200).json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async cancelBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const result = await BookingService.cancelBooking(bookingId);
            res.status(200).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = BookingController;