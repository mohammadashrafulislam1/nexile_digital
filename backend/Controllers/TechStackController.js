import fs from 'fs';
import { TechStackModel } from "../Model/TechStackModel";
import { cloudinary } from "../utils/cloudinary";

// Helper function for uploading images to Cloudinary
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'nexile digital/techStacks' // Upload images to the 'techStacks' folder
        });
        fs.unlinkSync(filePath); // Delete the temp file after upload
        return { url: result.secure_url, public_id: result.public_id };
    } catch (error) {
        throw new Error('Error uploading image');
    }
};

// Controller function for adding a tech stack
export const addTechStack = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // Upload image to Cloudinary
        const { url, public_id } = await uploadImage(req.file.path);

        // Create new tech stack entry
        const newTechStack = new TechStackModel({
            title: req.body.title,
            description: req.body.description,
            image: url,
            publicId: public_id
        });

        // Save to database
        await newTechStack.save();
        console.log(newTechStack)
        return res.status(201).json({ message: "Tech stack added successfully!", techStack: newTechStack });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
