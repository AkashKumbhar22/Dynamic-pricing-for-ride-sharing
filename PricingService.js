const redis = require("redis");
const BookingService = require("./BookingService");
const DriverService = require("./DriverService");

const redisClient = redis.createClient();
redisClient.connect();

class PricingService {
  constructor() {
    this.basePrice = 5; // Base fare
    this.demandMultiplier = 1.2;
  }

  async calculatePrice(area) {
    // Check Redis cache first
    const cacheKey = `price:${JSON.stringify(area)}`;
    const cachedPrice = await redisClient.get(cacheKey);
    if (cachedPrice) return JSON.parse(cachedPrice);

    // Calculate demand/supply
    const bookings = BookingService.getBookingsInArea(area);
    const drivers = DriverService.getAvailableDriversInArea(area);
    
    let price = this.basePrice;
    if (bookings.length > drivers.length) {
      price *= this.demandMultiplier ** (bookings.length - drivers.length);
    }

    // Cache for 2 minutes
    await redisClient.setEx(cacheKey, 120, JSON.stringify(price));
    return price;
  }
}

module.exports = new PricingService();
