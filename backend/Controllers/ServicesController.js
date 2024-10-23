import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { ServicesModel } from '../Model/ServicesModel.js';

export const addService = async (req, res) => {
  try {
    // Extract fields from the request body
    const { title, subtitle, approach, process, why, tools } = req.body;

    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);

    // Initialize arrays for each section
    const approachItems = [];
    const processItems = [];
    const whyItems = [];
    const toolsItems = [];

    // Function to handle uploads for each section
    const handleUploads = async (sectionItems, sectionName) => {
      if (Array.isArray(req.body[sectionName]) && req.files[`${sectionName}[image]`]) {
        const uploadPromises = req.files[`${sectionName}[image]`].map(async (file, index) => {
          try {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: `nexile digital/services/${sectionName}`, // Add folder structure
            });
            fs.unlinkSync(file.path); // Clean up local file storage
            return {
              title: req.body[sectionName][index]?.title || '',
              description: req.body[sectionName][index]?.description || '',
              image: result.secure_url,
              imagePublicId: result.public_id,
            };
          } catch (uploadError) {
            console.error(`Error uploading file for ${sectionName}:`, uploadError);
            return null; // Return null for failed uploads
          }
        });

        const uploadedItems = await Promise.all(uploadPromises);
        return uploadedItems.filter(item => item !== null); // Only include successful uploads
      }
      return []; // Return empty if no items
    };

    // Handle uploads for each section
    approachItems.push(...await handleUploads(approach, 'approach'));
    processItems.push(...await handleUploads(process, 'process'));
    whyItems.push(...await handleUploads(why, 'why'));
    toolsItems.push(...await handleUploads(tools, 'tools'));

    // Handle the main service image upload
    let mainServiceImageUrl = '';
    let mainServiceImagePublicId = '';
    if (req.files['mainServiceImage']) {
      const mainImageFile = req.files['mainServiceImage'][0]; // Get the first file
      const mainImageUpload = await cloudinary.uploader.upload(mainImageFile.path, {
        folder: `nexile digital/services`, // Add folder structure
      });
      mainServiceImageUrl = mainImageUpload.secure_url; 
      mainServiceImagePublicId = mainImageUpload.public_id;
      fs.unlinkSync(mainImageFile.path);
    }

    // Create a new service instance without wrapping services
    const newService = new ServicesModel({
      title,
      subtitle,
      mainServiceImage: mainServiceImageUrl,
      mainServiceImagePublicId: mainServiceImagePublicId,
      approach: approachItems,
      process: processItems,
      why: whyItems,
      tools: toolsItems,
    });

    console.log(newService);

    // Save the new service to the database
    await newService.save();

    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    console.error("Error in addService controller:", error);
    res.status(500).json({ message: 'Error adding service', error: error.message });
  }
};


export const updateService = async (req, res) => {
  const { id } = req.params; // Get the service ID from the request parameters
  try {
    // Extract fields from the request body
    const { title, subtitle, approach, process, why, tools } = req.body;

    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);

    // Find the existing service by ID
    const service = await ServicesModel.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Initialize arrays for each section
    const approachItems = [];
    const processItems = [];
    const whyItems = [];
    const toolsItems = [];

    // Function to handle uploads for each section
    const handleUploads = async (sectionItems, sectionName) => {
      if (Array.isArray(req.body[sectionName]) && req.files[`${sectionName}[image]`]) {
        const uploadPromises = req.files[`${sectionName}[image]`].map(async (file, index) => {
          try {
            const result = await cloudinary.uploader.upload(file.path, {
              folder: `nexile digital/services/${sectionName}`, // Add folder structure
            });
            fs.unlinkSync(file.path); // Clean up local file storage
            return {
              title: req.body[sectionName][index]?.title || '',
              description: req.body[sectionName][index]?.description || '',
              image: result.secure_url,
              imagePublicId: result.public_id,
            };
          } catch (uploadError) {
            console.error(`Error uploading file for ${sectionName}:`, uploadError);
            return null; // Return null for failed uploads
          }
        });

        const uploadedItems = await Promise.all(uploadPromises);
        return uploadedItems.filter(item => item !== null); // Only include successful uploads
      }
      return []; // Return empty if no items
    };

    // Handle uploads for each section
    approachItems.push(...await handleUploads(approach, 'approach'));
    processItems.push(...await handleUploads(process, 'process'));
    whyItems.push(...await handleUploads(why, 'why'));
    toolsItems.push(...await handleUploads(tools, 'tools'));

    // Handle the main service image upload if a new one is provided
    let mainServiceImageUrl = service.mainServiceImage; // Keep the existing image by default
    let mainServiceImagePublicId = service.mainServiceImagePublicId; // Keep the existing public ID by default
    if (req.files['mainServiceImage']) {
      const mainImageFile = req.files['mainServiceImage'][0]; // Get the first file
      const mainImageUpload = await cloudinary.uploader.upload(mainImageFile.path, {
        folder: `nexile digital/services`, // Add folder structure
      });
      mainServiceImageUrl = mainImageUpload.secure_url; 
      mainServiceImagePublicId = mainImageUpload.public_id;
      fs.unlinkSync(mainImageFile.path);
    }

    // Update the service fields
    service.title = title || service.title;
    service.subtitle = subtitle || service.subtitle;
    service.approach = approachItems.length > 0 ? approachItems : service.approach;
    service.process = processItems.length > 0 ? processItems : service.process;
    service.why = whyItems.length > 0 ? whyItems : service.why;
    service.tools = toolsItems.length > 0 ? toolsItems : service.tools;
    service.mainServiceImage = mainServiceImageUrl;
    service.mainServiceImagePublicId = mainServiceImagePublicId;

    // Save the updated service to the database
    await service.save();

    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error("Error in updateService controller:", error);
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};





  
// Get one service by ID
export const getOneService = async (req, res) => {
    const { title } = req.params;

    try {
        const findService = await ServicesModel.findOne({title: title});
        if (!findService) {
            return res.status(404).json({ message: 'Service not found' });
        } else {
            res.status(200).json(findService);
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Error fetching services' });
    }
};


// Get all services
export const getAllServices = async (req, res) => {
    try {
      const services = await ServicesModel.find();
      res.status(200).json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Error fetching services' });
    }
  };

// Delete a service
export const deleteService = async (req, res) => {
    try {
      const { id } = req.params; // Get service ID from request parameters
  
      // Find the service to delete
      const serviceToDelete = await ServicesModel.findById(id);
      if (!serviceToDelete) {
        return res.status(404).json({ message: 'Service not found' });
      }
      console.log(serviceToDelete)
      // Delete main service image from Cloudinary
      const publicId = serviceToDelete.mainServiceImagePublicId; // Assuming you store the public ID of the main service image
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
  
      // Delete sub-service images from Cloudinary
      for (const subService of serviceToDelete.services) {
        const subServicePublicId = subService.imagePublicId; // Assuming you store public IDs for sub-service images
        if (subServicePublicId) {
          await cloudinary.uploader.destroy(subServicePublicId);
        }
  
        // Delete section images from each sub-service
        for (const section of subService.approach) {
          if (section.imagePublicId) {
            await cloudinary.uploader.destroy(section.imagePublicId);
          }
        }
  
        for (const section of subService.process) {
          if (section.imagePublicId) {
            await cloudinary.uploader.destroy(section.imagePublicId);
          }
        }
  
        for (const section of subService.why) {
          if (section.imagePublicId) {
            await cloudinary.uploader.destroy(section.imagePublicId);
          }
        }
  
        for (const section of subService.tools) {
          if (section.imagePublicId) {
            await cloudinary.uploader.destroy(section.imagePublicId);
          }
        }
      }
  
      // Delete the service record from the database
      await ServicesModel.findByIdAndDelete(id);
      res.status(204).send(); // No content to send back
  
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Error deleting service' });
    }
  };
  
  
