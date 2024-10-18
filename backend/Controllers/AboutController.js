import { AboutModel } from "../Model/AboutModel.js";
import { cloudinary } from "../utils/cloudinary.js";
import fs from "fs";

// Helper function for uploading images
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'nexile digital/about'
        });
        fs.unlinkSync(filePath); // Delete temp file
        return { url: result.secure_url, public_id: result.public_id };
    } catch (error) {
        throw new Error('Error uploading image');
    }
};

// Add About Us
export const addAboutUs = async (req, res) => {
    try {
        const {
            sectionTitle,
            sectionDes,
            metaTitle,
            metaDes,
            tagline,
            whoWeAre,
            ourStory,
            ourMission,
            ourVision,
            coreValues,
            whyChooseUs,
            ourImpact,
            socialProof
        } = req.body;

        // Upload images
        const storyImage = req.files?.storyImage ? await uploadImage(req.files.storyImage[0].path) : null;
        const missionImage = req.files?.missionImage ? await uploadImage(req.files.missionImage[0].path) : null;
        const visionImage = req.files?.visionImage ? await uploadImage(req.files.visionImage[0].path) : null;

        // Parse array fields if they are sent as JSON strings
        const parsedCoreValues = coreValues ? JSON.parse(coreValues) : [];

        // Create new AboutUs document
        const newAboutUs = new AboutModel({
            sectionTitle,
            sectionDes,
            metaTitle,
            metaDes,
            intro: {
                tagline,
                whoWeAre
            },
            ourStory: {
                description: ourStory,
                image: storyImage
            },
            ourMission: {
                description: ourMission,
                image: missionImage
            },
            ourVision: {
                description: ourVision,
                image: visionImage
            },
            coreValues: parsedCoreValues,
            whyChooseUs: whyChooseUs ? JSON.parse(whyChooseUs) : [],
            ourImpact: ourImpact ? JSON.parse(ourImpact) : [],
            socialProof: socialProof ? JSON.parse(socialProof) : []
        });

        // Save the About Us document
        const savedAboutUs = await newAboutUs.save();
        res.status(201).json(savedAboutUs);
    } catch (error) {
        console.error('Error adding About Us:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update About Us
export const updateAboutUs = async (req, res) => {
    try {
        // Fetch existing AboutUs document
        const existingAboutUs = await AboutModel.findOne();

        if (!existingAboutUs) {
            return res.status(404).json({ message: "About Us section not found." });
        }

        // Destructure the request body for new data
        const {
            sectionTitle,
            sectionDes,
            metaTitle,
            metaDes,
            tagline,
            whoWeAre,
            ourStory,
            ourMission,
            ourVision,
            coreValues,
            whyChooseUs,
            ourImpact,
            socialProof
        } = req.body;

        // Update fields while retaining existing values if new ones are not provided
        existingAboutUs.sectionTitle = sectionTitle || existingAboutUs.sectionTitle;
        existingAboutUs.sectionDes = sectionDes || existingAboutUs.sectionDes;
        existingAboutUs.metaTitle = metaTitle || existingAboutUs.metaTitle;
        existingAboutUs.metaDes = metaDes || existingAboutUs.metaDes;
        existingAboutUs.intro.tagline = tagline || existingAboutUs.intro.tagline;
        existingAboutUs.intro.whoWeAre = whoWeAre || existingAboutUs.intro.whoWeAre;

        // Upload images for ourStory, ourMission, and ourVision
        existingAboutUs.ourStory = {
            description: ourStory.description || existingAboutUs.ourStory.description,
            image: await uploadImage(req.files?.storyImage?.[0]) || existingAboutUs.ourStory.image
        };

        existingAboutUs.ourMission = {
            description: ourMission.description || existingAboutUs.ourMission.description,
            image: await uploadImage(req.files?.missionImage?.[0]) || existingAboutUs.ourMission.image
        };

        existingAboutUs.ourVision = {
            description: ourVision.description || existingAboutUs.ourVision.description,
            image: await uploadImage(req.files?.visionImage?.[0]) || existingAboutUs.ourVision.image
        };

        // Update coreValues and other fields
        existingAboutUs.coreValues = coreValues ? JSON.parse(coreValues) : existingAboutUs.coreValues;
        existingAboutUs.whyChooseUs = whyChooseUs ? JSON.parse(whyChooseUs) : existingAboutUs.whyChooseUs;
        existingAboutUs.ourImpact = ourImpact ? JSON.parse(ourImpact) : existingAboutUs.ourImpact;
        existingAboutUs.socialProof = socialProof ? JSON.parse(socialProof) : existingAboutUs.socialProof;

        // Save the updated AboutUs document
        const savedAboutUs = await existingAboutUs.save();
        res.status(200).json(savedAboutUs);
    } catch (error) {
        console.error('Error updating About Us:', error);
        res.status(500).json({ message: 'Error updating About Us' });
    }
};

// Controller to fetch the "About Us" section
export const getAboutUs = async (req, res) => {
    try {
      const aboutUs = await AboutModel.findOne(); // Fetch the first (and only) About Us entry
      
      if (!aboutUs) {
        return res.status(404).json({ message: 'About Us section not found' });
      }
      
      // Respond with the "About Us" data
      res.status(200).json(aboutUs);
    } catch (error) {
      console.error('Error fetching About Us:', error);
      res.status(500).json({ message: 'Error fetching About Us' });
    }
  };