const express = require('express');

const Booking = require("../model/booking.model");

const BookingRouter = express.Router();

BookingRouter.post('api/bookings', async (req, res) => {
    try {
      const booking = await Booking.create(req.body);
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Get all bookings with flight and user details
  BookingRouter.get('api/dashboard', async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate('user', '-password')
        .populate('flight');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Update a booking
  BookingRouter.patch('api/dashboard/:id', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Delete a booking
  BookingRouter.delete('api/dashboard/:id', async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  module.exports = {
    BookingRouter
  }