// DriverService.js
class DriverService {
    constructor() {
      this.drivers = [];
    }
  
    updateDriverLocation(driverId, location) {
      const driver = this.drivers.find(d => d.id === driverId);
      if (driver) {
        driver.location = location;
      } else {
        this.drivers.push({ id: driverId, location, status: "available" });
      }
      return driver;
    }
  
    getAvailableDriversInArea(area) {
      return this.drivers.filter(driver => 
        driver.status === "available" &&
        driver.location.lat >= area.minLat &&
        driver.location.lat <= area.maxLat &&
        driver.location.lng >= area.minLng &&
        driver.location.lng <= area.maxLng
      );
    }
  }
  
  module.exports = new DriverService();