const express = require('express');

const Flight = require('../model/flight.model');
const FlightRouter = express.Router();

FlightRouter.get('api/flights', async (req, res) => {
    try {
      const flights = await Flight.find();
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Get details of a specific flight
  FlightRouter.get('api/flights/:id', async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Add a new flight
  FlightRouter.post('api/flights', async (req, res) => {
    try {
      const flight = await Flight.create(req.body);
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Update details of a specific flight
  FlightRouter.patch('api/flights/:id', async (req, res) => {
    try {
      const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Delete a specific flight
  FlightRouter.delete('api/flights/:id', async (req, res) => {
    try {
      await Flight.findByIdAndDelete(req.params.id);
      res.json({ message: 'Flight deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  module.exports = {
    FlightRouter
  }