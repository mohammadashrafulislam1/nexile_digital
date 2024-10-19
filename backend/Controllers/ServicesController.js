import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { ServicesModel } from '../Model/ServicesModel.js';

// Add a new service with Cloudinary image upload
export const addService = async (req, res) => {
    try {
      let serviceImageUrl = '';
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'nexile digital/services',
          });
          serviceImageUrl = result.secure_url;
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          return res.status(500).json({ message: 'Error uploading main service image' });
        }
      }
  
      const subServices = req.body.services ? JSON.parse(req.body.services) : [];
  
      const processedSubServices = await Promise.all(
        subServices.map(async (subService) => {
          let subServiceImageUrl = '';
  
          if (subService.image) {
            try {
              const subServiceResult = await cloudinary.uploader.upload(subService.image, {
                folder: 'nexile digital/services/subServices',
              });
              subServiceImageUrl = subServiceResult.secure_url;
            } catch (uploadError) {
              console.error('Error uploading sub-service image:', uploadError);
            }
          }
  
          return {
            ...subService,
            image: subServiceImageUrl,
          };
        })
      );
  
      const newService = new ServicesModel({
        title: req.body.title,
        description: req.body.description,
        MetaTitle: req.body.MetaTitle,
        MetaDescription: req.body.MetaDescription,
        services: processedSubServices,
        image: serviceImageUrl, // Add the main service image URL here
      });
  
      const savedService = await newService.save();
      res.status(201).json(savedService);
    } catch (error) {
      console.error('Error adding service:', error);
      res.status(500).json({ message: 'Error adding service' });
    }
  };
  

// Update a service
export const updateService = async (req, res) => {
    try {
      const { id } = req.params;
  
      const existingService = await ServicesModel.findById(id);
      if (!existingService) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      const updatedData = {
        title: req.body.title || existingService.title,
        description: req.body.description || existingService.description,
        MetaTitle: req.body.MetaTitle || existingService.MetaTitle,
        MetaDescription: req.body.MetaDescription || existingService.MetaDescription,
        services: existingService.services,
      };
  
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'nexile digital/services',
          });
          updatedData.image = result.secure_url;
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          return res.status(500).json({ message: 'Error uploading main service image' });
        }
      }
  
      if (req.body.services) {
        const processedSubServices = await Promise.all(
          req.body.services.map(async (subService) => {
            let subServiceImageUrl = '';
  
            if (subService.image) {
              try {
                const subServiceResult = await cloudinary.uploader.upload(subService.image, {
                  folder: 'nexile digital/services/subServices',
                });
                subServiceImageUrl = subServiceResult.secure_url;
              } catch (uploadError) {
                console.error('Error uploading sub-service image:', uploadError);
              }
            } else {
              const existingSubService = existingService.services.find(s => s._id.toString() === subService._id);
              if (existingSubService) {
                subServiceImageUrl = existingSubService.image; // Retain existing image
              }
            }
  
            return {
              ...subService,
              image: subServiceImageUrl,
            };
          })
        );
  
        updatedData.services = processedSubServices;
      }
  
      const updatedService = await ServicesModel.findByIdAndUpdate(id, updatedData, { new: true });
      res.status(200).json(updatedService);
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ message: 'Error updating service' });
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
  
      // Delete main service image from Cloudinary
      const publicId = serviceToDelete.imagePublicId; // Assuming you store the public ID of the main service image
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
  
        for (const section of subService.portfolio) {
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
  
  
