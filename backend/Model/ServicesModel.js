import mongoose from "mongoose";

// Schema for sections like Approach, Process, Why, Tools, and Portfolio
const sectionSchema = new mongoose.Schema({
  title: { type: String},
  description: { type: String}, 
  image: { type: String, required: false },
  imagePublicId: { type: String},
});

// Sub-service schema for individual services within a main service
const subServiceSchema = new mongoose.Schema({
  title: { type: String}, 
  image: { type: String},
  imagePublicId: { type: String},
  subtitle: { type: String},
  approach: { type: [sectionSchema]},
  process: { type: [sectionSchema]}, 
  why: { type: [sectionSchema]},
  tools: { type: [sectionSchema]}, 
  portfolio: { type: [sectionSchema]},
});

// Main service schema for broader categories like Web Development, Web Design, SEO, etc.
const servicesSchema = new mongoose.Schema({
  title: { type: String}, 
  description: { type: String},
  services: [subServiceSchema],
}, { timestamps: true });

export const ServicesModel = mongoose.model('Service', servicesSchema);
