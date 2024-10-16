
import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { HeroModel } from '../Model/HeroModel.js';

// Add a new hero with logo upload
export const addHero = async (req, res) => {
  try {
    // Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ message: 'No logo uploaded' });
    }

    // Upload logo to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'nexile digital', 
    });

    // Delete the file from the local server after upload
    fs.unlinkSync(req.file.path);

    // Create a new hero record with the Cloudinary logo URL
    const newHero = new HeroModel({
      logo: result.secure_url, // Cloudinary URL for the logo
      menu: req.body.menu,
      title: req.body.title,
      description: req.body.description,
      googleReview: req.body.googleReview,
      nexileReview: req.body.nexileReview,
      clients: req.body.clients,
      experience: req.body.experience,
    });

    // Save hero to the database
    const savedHero = await newHero.save();
    res.status(201).json(savedHero);

  } catch (error) {
    console.error('Error adding hero:', error);
    res.status(500).json({ message: 'Error adding hero' });
  }
};
