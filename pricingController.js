const PricingService = require('../services/PricingService');

class PricingController {
    static async calculatePrice(req, res) {
        try {
            const { pickupLocation, destination, vehicleType } = req.body;
            const price = await PricingService.calculatePrice(pickupLocation, destination, vehicleType);
            res.status(200).json({ success: true, data: { price } });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async applyDiscount(req, res) {
        try {
            const { bookingId, discountCode } = req.body;
            const updatedPrice = await PricingService.applyDiscount(bookingId, discountCode);
            res.status(200).json({ success: true, data: { updatedPrice } });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = PricingController;