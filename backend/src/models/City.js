import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('City', citySchema); 