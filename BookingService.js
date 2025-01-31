// BookingService.js
class BookingService {
    constructor() {
      this.bookings = [];
    }
  
    createBooking(location) {
      const booking = { id: Date.now(), location, timestamp: new Date() };
      this.bookings.push(booking);
      return booking;
    }
  
    getBookingsInArea(area) {
      return this.bookings.filter(booking => 
        booking.location.lat >= area.minLat &&
        booking.location.lat <= area.maxLat &&
        booking.location.lng >= area.minLng &&
        booking.location.lng <= area.maxLng
      );
    }
  }
  
  module.exports = new BookingService();