const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173" // Frontend URL
  }
});

// Real-time price updates
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('subscribeToPrice', (area) => {
    const interval = setInterval(async () => {
      const price = await PricingService.calculatePrice(area);
      socket.emit('priceUpdate', price);
    }, 5000); // Update every 5 seconds
    
    socket.on('disconnect', () => {
      clearInterval(interval);
    });
  });
});

httpServer.listen(3000);