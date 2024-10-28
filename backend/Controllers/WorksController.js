import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { WorksModel } from '../Model/WorksModel.js';

export const addWork = async (req, res) => {
  try {
    const {
      category,
      metaTitle,
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
      metaTitle,
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
  const { id } = req.params;
  try {
    const existingWork = await WorksModel.findById(id);
    if (!existingWork) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    const {
      category,
      metaTitle,
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

    let images = existingWork.images.slice();

    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'nexile_digital/showcase_images',
        });
        images.push({ publicId: result.public_id, url: result.secure_url });
        fs.unlinkSync(file.path);
      }
    }
// Handle techStacks if new ones are uploaded
let techStackData;
if (typeof techStack === 'string') {
  try {
    techStackData = JSON.parse(techStack);
  } catch (error) {
    console.error("Error parsing TechStack:", error);
    techStackData = [];
  }
} else {
  techStackData = techStack || [];
}

let techStackWithImages = existingWork.techStack ? existingWork.techStack.slice() : [];
if (techStackData.length > 0 && req.files && req.files['techStackImage']) {
  const techStackUploadPromises = req.files['techStackImage'].map(async (file, index) => {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      fs.unlinkSync(file.path);
      return {
        title: techStackData[index]?.title || "",
        image: result.secure_url,
        publicId: result.public_id,
        description: techStackData[index]?.description || "",
      };
    } catch (uploadError) {
      console.error("Error uploading techStack file:", uploadError);
      return null;
    }
  });
  const techStackResults = await Promise.all(techStackUploadPromises);
  techStackWithImages.push(...techStackResults.filter(techStack => techStack !== null));
}
   

    const updatedWork = await WorksModel.findByIdAndUpdate(
      id,
      {
        category: category || existingWork.category,
        title: title || existingWork.title,
        projectUrl: projectUrl || existingWork.projectUrl,
        githubUrl: githubUrl || existingWork.githubUrl,
        images,
        client: client || existingWork.client,
        shortDescription: shortDescription || existingWork.shortDescription,
        problemGoal: problemGoal || existingWork.problemGoal,
        servicesProvided: servicesProvided || existingWork.servicesProvided,
        projectTimeline: projectTimeline || existingWork.projectTimeline,
        customSolutions: customSolutions || existingWork.customSolutions,
        metricsData: metricsData || existingWork.metricsData,
        techStack: techStackWithImages,
        tags: tags || existingWork.tags,
        isFeatured: isFeatured || existingWork.isFeatured,
        completionDate: completionDate || existingWork.completionDate,
        metaDescription: metaDescription || existingWork.metaDescription,
        metaTitle: metaTitle || existingWork.metaTitle,
        metaKeywords: metaKeywords || existingWork.metaKeywords,
      },
      { new: true }
    );

    console.log("Updated Work:", updatedWork);

    res.status(200).json({ success: true, message: 'Work updated successfully', updatedWork });
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

export const deleteTechStack = async (req, res) => {
  try {
    const { id, techId } = req.params; // Get work ID and tech ID from the request parameters
    const { publicId } = req.body; // Get the publicId from the request body

    // Find the work entry by ID
    const findWork = await WorksModel.findById(id);
    if (!findWork) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    // Find the tech stack entry to be deleted
    const techStackEntry = findWork.techStack.find(entry => entry._id.toString() === techId);
    if (!techStackEntry) {
      return res.status(404).json({ success: false, message: 'Tech stack entry not found' });
    }

    // Delete the image from Cloudinary if you want to remove it
   if(publicId){
    await cloudinary.v2.uploader.destroy(publicId); 
   }
    // Filter out the tech stack entry
    const updatedTechStack = findWork.techStack.filter(entry => entry._id.toString() !== techId);

    // Update the work entry with the new tech stack
    findWork.techStack = updatedTechStack;
    await findWork.save();

    res.status(200).json({ success: true, message: 'Tech stack entry deleted successfully', updatedTechStack });
  } catch (error) {
    console.error('Error deleting tech stack:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params; // Get the work ID from the request parameters
    const { publicId } = req.body; // Get the publicId from the request body

    // Check if both ID and publicId are provided
    if (!id || !publicId) {
      return res.status(400).json({ success: false, message: 'Work ID and publicId are required' });
    }

    // Find the work entry by ID
    const workEntry = await WorksModel.findById(id);
    if (!workEntry) {
      return res.status(404).json({ success: false, message: 'Work not found' });
    }

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Optionally, remove the image reference from the database if it exists
    workEntry.images = workEntry.images.filter(image => image.publicId !== publicId);
    await workEntry.save(); // Save the updated work entry

    return res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
  
  