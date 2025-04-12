import express from 'express';
import City from '../models/City.js';

const router = express.Router();

// Get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single city
router.get('/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new city
router.post('/', async (req, res) => {
  const city = new City(req.body);
  try {
    const newCity = await city.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a city
router.put('/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a city
router.delete('/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 