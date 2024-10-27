import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { WorksModel } from '../Model/WorksModel.js';

export const addWork = async (req, res) => {
  try {
    const {
      category,
      title,
      githubUrl,
      projectUrl,
      client,
      shortDescription,
      problemGoal,
      servicesProvided,
      projectTimeline,
      customSolutions,
      metricsData,
      tags,
      isFeatured,
      completionDate,
      metaDescription,
      metaKeywords,
      techStack,
    } = req.body;

    console.log("req.body", req.body);
    console.log("req.files", req.files);
    console.log("Tags:", tags);
    console.log("techStack:", techStack);
    console.log("Services Provided:", servicesProvided);

    let images = [];
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'nexile_digital/showcase_images'
        });
        images.push({ publicId: result.public_id, url: result.secure_url });
        fs.unlinkSync(file.path);
      }
    }

    let techStackWithImages = [];
if (req.files && req.files.techStackImage) {
  let techStackArray = typeof techStack === 'string' ? JSON.parse(techStack) : techStack;

  for (let i = 0; i < techStackArray.length; i++) {
    const stackItem = techStackArray[i];

    // Ensure the current stackItem has required properties
    const title = stackItem.title || 'Default Title';
    const description = stackItem.description || 'Default Description';
    let image = null;
    let publicId = null;

    if (req.files.techStackImage[i]) {
      const techStackImageResult = await cloudinary.uploader.upload(req.files.techStackImage[i].path, {
        folder: 'nexile_digital/tech_stack_images'
      });
      fs.unlinkSync(req.files.techStackImage[i].path);
      image = techStackImageResult.secure_url;
      publicId = techStackImageResult.public_id;
    }

    // Add the item to techStackWithImages
    techStackWithImages.push({
      title,
      description,
      image: image || 'defaultImageUrl.jpg', // Use a default image URL if none provided
      publicId: publicId || 'defaultPublicId', // Handle missing publicId
    });
  }
}


    const newShowcase = new WorksModel({
      category,
      title,
      projectUrl,
      githubUrl,
      images,
      client,
      shortDescription,
      problemGoal,
      servicesProvided,
      projectTimeline,
      customSolutions,
      metricsData,
      techStack: techStackWithImages,
      tags,
      isFeatured,
      completionDate,
      metaDescription,
      metaKeywords,
    });

   await newShowcase.save();
    console.log("New Work Created:", newShowcase);

    res.status(201).json({ success: true, message: 'Work added successfully', newShowcase });
  } catch (error) {
    console.error("Error adding work:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWork = async (req, res) => {
  const { id } = req.params; // Assuming the ID is passed in the URL parameters
  try {
    // Find the existing work by ID
    const existingWork = await WorksModel.findById(id);
    if (!existingWork) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    const {
      category,
      title,
      githubUrl,
      projectUrl,
      client,
      shortDescription,
      problemGoal,
      servicesProvided,
      projectTimeline,
      customSolutions,
      metricsData,
      tags,
      isFeatured,
      completionDate,
      metaDescription,
      metaKeywords,
      techStack,
    } = req.body;

    console.log("req.body", req.body)
    console.log("req.files", req.files)

    // Log the incoming data for debugging
    console.log("Updating Work:", { id, category, title, tags, techStack });

    // Start with existing images
    let images = existingWork.images.slice(); // Clone existing images

    // Add new images if provided
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'nexile_digital/showcase_images',
        });
        images.push({ publicId: result.public_id, url: result.secure_url });
        fs.unlinkSync(file.path); // Delete local file after upload
      }
    }

    // Update tech stack images
    let techStackWithImages = [];
    if (req.files && req.files.techStackImage) {
      let techStackArray = typeof techStack === 'string' ? JSON.parse(techStack) : techStack;

      for (let i = 0; i < techStackArray.length; i++) {
        const stackItem = techStackArray[i];
        const title = stackItem.title || 'Default Title';
        const description = stackItem.description || 'Default Description';
        let image = null;
        let publicId = null;

        if (req.files.techStackImage[i]) {
          const techStackImageResult = await cloudinary.uploader.upload(req.files.techStackImage[i].path, {
            folder: 'nexile_digital/tech_stack_images',
          });
          fs.unlinkSync(req.files.techStackImage[i].path);
          image = techStackImageResult.secure_url;
          publicId = techStackImageResult.public_id;
        }

        techStackWithImages.push({
          title,
          description,
          image: image || 'defaultImageUrl.jpg',
          publicId: publicId || 'defaultPublicId',
        });
      }
    } else {
      // If no new tech stack images are provided, keep existing ones
      techStackWithImages = existingWork.techStack;
    }

    // Update the existing work entry
    existingWork.set({
      category,
      title,
      projectUrl,
      githubUrl,
      images,
      client,
      shortDescription,
      problemGoal,
      servicesProvided,
      projectTimeline,
      customSolutions,
      metricsData,
      techStack: techStackWithImages,
      tags,
      isFeatured,
      completionDate,
      metaDescription,
      metaKeywords,
    });

    await existingWork.save(); // Save the updated work
    console.log("Updated Work:", existingWork);

    res.status(200).json({ success: true, message: 'Work updated successfully', updatedWork: existingWork });
  } catch (error) {
    console.error("Error updating work:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Function to get all showcases
export const getAllShowcases = async (req, res) => {
    try {
      const works = await WorksModel.find()
      res.status(200).json({ success: true, works });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Function to get a single showcase by ID
  export const getShowcaseById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the work document by ID
      const work = await WorksModel.findById(id);
      if (!work) return res.status(404).json({ success: false, message: 'Work not found' });
  
  
      res.status(200).json({ success: true, work });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // Function to get a showcase by title
export const getShowcaseByTitle = async (req, res) => {
  try {
    const { title } = req.params; // Get the title from the request parameters

    // Find the work document that contains the showcase with the specified title
    const work = await WorksModel.findOne({ "showcases.title": title });

    if (!work) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    // Filter the showcase to find the one with the matching title
    const showcase = work.showcases.find(showcase => showcase.title === title);

    if (!showcase) {
      return res.status(404).json({ success: false, message: 'Showcase not found' });
    }

    res.status(200).json({ success: true, showcase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to delete a showcase
export const deleteWork = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from request parameters

    // Find the work entry by ID
    const workToDelete = await WorksModel.findById(id);
    if (!workToDelete) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    // Delete images from Cloudinary
    if (workToDelete.images && workToDelete.images.length > 0) {
      for (const image of workToDelete.images) {
        await cloudinary.uploader.destroy(image.publicId); // Destroy the image by public ID
      }
    }

    // Delete tech stack images from Cloudinary
    if (workToDelete.techStack && workToDelete.techStack.length > 0) {
      for (const tech of workToDelete.techStack) {
        if (tech.publicId) {
          await cloudinary.uploader.destroy(tech.publicId); // Destroy tech stack image by public ID
        }
      }
    }

    // Remove the work entry from the database
    await WorksModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Work deleted successfully' });
  } catch (error) {
    console.error('Error deleting work:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
  
  