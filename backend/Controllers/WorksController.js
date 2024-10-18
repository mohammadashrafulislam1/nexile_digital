import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { WorksModel } from '../Model/WorksModel.js';

// Function to add a new work (section + showcase)
export const addWork = async (req, res) => {
  try {
    const { sectionTitle, description, category, title, projectUrl, client, shortDescription, problemGoal, servicesProvided, projectTimeline, customSolutions, metricsData, tags, isFeatured, completionDate, metaDescription, metaKeywords, techStack } = req.body;

    let images = [];
    if (req.files && req.files.images && req.files.images.length > 0) {
      // Upload each image to Cloudinary for general project images
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'nexile_digital/showcase_images' // Define a folder for general images
        });
        images.push({ publicId: result.public_id, url: result.secure_url });
        fs.unlinkSync(file.path);
      }
    }

    // Upload techStack images
    let techStackWithImages = [];
    if (techStack && req.files && req.files.techStackImages) {
      const techStackArray = JSON.parse(techStack); // Parse techStack if it's coming as a JSON string

      for (let i = 0; i < techStackArray.length; i++) {
        const stackItem = techStackArray[i];

        if (req.files.techStackImages[i]) {
          const techStackImageResult = await cloudinary.uploader.upload(req.files.techStackImages[i].path, {
            folder: 'nexile_digital/tech_stack_images' // Define a folder for tech stack images
          });
          fs.unlinkSync(req.files.techStackImages[i].path); // Remove image from server after upload

          techStackWithImages.push({
            title: stackItem.title,
            description: stackItem.description,
            image: techStackImageResult.secure_url,
            publicId: techStackImageResult.public_id,
          });
        } else {
          techStackWithImages.push(stackItem);
        }
      }
    }

    const newShowcase = {
      category,
      title,
      projectUrl,
      images, // Cloudinary uploaded images
      client,
      shortDescription,
      problemGoal,
      servicesProvided,
      projectTimeline,
      customSolutions,
      metricsData,
      techStack: techStackWithImages, // Tech stack with images
      tags,
      isFeatured,
      completionDate,
      metaDescription,
      metaKeywords,
    };

    const newWork = await WorksModel.create({
      sectionTitle,
      description,
      showcases: [newShowcase],
    });

    res.status(201).json({ success: true, message: 'Work added successfully', newWork });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to update an existing showcase in a work
export const updateShowcase = async (req, res) => {
  try {
    const { id, showcaseId } = req.params;
    const updatedData = req.body;

    // Find the work document by ID
    const work = await WorksModel.findById(id);
    if (!work) return res.status(404).json({ success: false, message: 'Work not found' });

    // Find the showcase by its ID
    const showcase = work.showcases.id(showcaseId);
    if (!showcase) return res.status(404).json({ success: false, message: 'Showcase not found' });

    // Handle new image uploads for general project images
    if (req.files && req.files.images && req.files.images.length > 0) {
      // Remove old Cloudinary images
      for (const img of showcase.images) {
        await cloudinary.uploader.destroy(img.publicId);
      }

      // Upload new images to Cloudinary
      showcase.images = [];
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'nexile_digital/showcase_images' // Define a folder for general images
        });
        showcase.images.push({
          publicId: result.public_id,
          url: result.secure_url,
        });
        fs.unlinkSync(file.path);
      }
    }

    // Handle techStack image updates
    if (req.files && req.files.techStackImages && req.body.techStack) {
      const techStackArray = JSON.parse(req.body.techStack); // Parse techStack if it's coming as a JSON string

      for (let i = 0; i < techStackArray.length; i++) {
        const stackItem = techStackArray[i];
        let techStackItem = showcase.techStack[i];

        if (!techStackItem) {
          // If the techStack item doesn't exist, create a new one
          techStackItem = {};
          showcase.techStack.push(techStackItem);
        }

        techStackItem.title = stackItem.title || techStackItem.title;
        techStackItem.description = stackItem.description || techStackItem.description;

        // Handle techStack image upload
        if (req.files.techStackImages[i]) {
          if (techStackItem.publicId) {
            await cloudinary.uploader.destroy(techStackItem.publicId); // Remove old image if exists
          }

          const techStackImageResult = await cloudinary.uploader.upload(req.files.techStackImages[i].path, {
            folder: 'nexile_digital/tech_stack_images' // Define a folder for tech stack images
          });
          fs.unlinkSync(req.files.techStackImages[i].path); // Remove image from server after upload

          techStackItem.image = techStackImageResult.secure_url;
          techStackItem.publicId = techStackImageResult.public_id;
        }
      }
    }

    // Update other fields in the showcase
    showcase.category = updatedData.category || showcase.category;
    showcase.title = updatedData.title || showcase.title;
    showcase.projectUrl = updatedData.projectUrl || showcase.projectUrl;
    showcase.client = updatedData.client || showcase.client;
    showcase.shortDescription = updatedData.shortDescription || showcase.shortDescription;
    showcase.problemGoal = updatedData.problemGoal || showcase.problemGoal;
    showcase.servicesProvided = updatedData.servicesProvided || showcase.servicesProvided;
    showcase.projectTimeline = updatedData.projectTimeline || showcase.projectTimeline;
    showcase.customSolutions = updatedData.customSolutions || showcase.customSolutions;
    showcase.metricsData = updatedData.metricsData || showcase.metricsData;
    showcase.tags = updatedData.tags || showcase.tags;
    showcase.isFeatured = updatedData.isFeatured !== undefined ? updatedData.isFeatured : showcase.isFeatured;
    showcase.completionDate = updatedData.completionDate || showcase.completionDate;
    showcase.metaDescription = updatedData.metaDescription || showcase.metaDescription;
    showcase.metaKeywords = updatedData.metaKeywords || showcase.metaKeywords;

    // Save the updated document
    await work.save();

    res.status(200).json({ success: true, message: 'Showcase updated successfully', work });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get all showcases
export const getAllShowcases = async (req, res) => {
    try {
      const works = await WorksModel.find().populate('showcases.clientTestimonial');
      res.status(200).json({ success: true, works });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Function to get a single showcase by ID
  export const getShowcaseById = async (req, res) => {
    try {
      const { id, showcaseId } = req.params;
  
      // Find the work document by ID
      const work = await WorksModel.findById(id);
      if (!work) return res.status(404).json({ success: false, message: 'Work not found' });
  
      // Find the showcase by its ID
      const showcase = work.showcases.id(showcaseId);
      if (!showcase) return res.status(404).json({ success: false, message: 'Showcase not found' });
  
      res.status(200).json({ success: true, showcase });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
// Function to delete a showcase
export const deleteShowcase = async (req, res) => {
    try {
      const { id, showcaseId } = req.params;
  
      // Find the work document by ID
      const work = await WorksModel.findById(id);
      if (!work) return res.status(404).json({ success: false, message: 'Work not found' });
  
      // Find the showcase by its ID
      const showcase = work.showcases.id(showcaseId);
      if (!showcase) return res.status(404).json({ success: false, message: 'Showcase not found' });
  
      // Remove the images from Cloudinary
      for (const img of showcase.images) {
        await cloudinary.uploader.destroy(img.publicId);
      }
  
      // Remove tech stack images from Cloudinary
      for (const techItem of showcase.techStack) {
        if (techItem.publicId) {
          await cloudinary.uploader.destroy(techItem.publicId);
        }
      }
  
      // Remove the showcase from the work document
      showcase.remove();
      
      // Save the updated work document
      await work.save();
  
      res.status(200).json({ success: true, message: 'Showcase and all associated images deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  