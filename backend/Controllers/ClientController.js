import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { ClientModel } from '../Model/ClientModel.js';

// Helper function for uploading images to Cloudinary
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'nexile_digital/clients'
        });
        fs.unlinkSync(filePath); // Delete the temp file after upload
        return { url: result.secure_url, public_id: result.public_id };
    } catch (error) {
        throw new Error('Error uploading image');
    }
};

// Controller to add a new client
export const addClient = async (req, res) => {
    try {
        const { sectionTitle, sectionDescription, name, description, email, phone } = req.body;
        let image = null;
        let publicId = null;

        // Check if image is uploaded
        if (req.file) {
            const uploadResult = await uploadImage(req.file.path);
            image = uploadResult.url;
            publicId = uploadResult.public_id;
        }

        // Create new client details
        const newClient = {
            image,
            publicId,
            name,
            description,
            email,
            phone,
        };

        // Add the client to the section
        const clientSection = new ClientModel({
            sectionTitle,
            sectionDescription,
            clients: [newClient]
        });

        // Save the new client section to the database
        await clientSection.save();
        res.status(201).json({ success: true, data: clientSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to update an existing client
export const updateClient = async (req, res) => {
    try {
        const { id } = req.params; // Client section ID
        const { clientId, name, description, email, phone } = req.body; // Client details
        let updatedImage = null;
        let updatedPublicId = null;

        // Find the section by ID
        const clientSection = await ClientModel.findById(id);
        if (!clientSection) {
            return res.status(404).json({ success: false, message: 'Client section not found' });
        }

        // Find the client within the section
        const client = clientSection.clients.id(clientId);
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        // If a new image is uploaded, delete the old image from Cloudinary and upload the new one
        if (req.file) {
            // Delete the old image if it exists
            if (client.publicId) {
                await cloudinary.uploader.destroy(client.publicId);
            }

            // Upload the new image
            const uploadResult = await uploadImage(req.file.path);
            updatedImage = uploadResult.url;
            updatedPublicId = uploadResult.public_id;
        }

        // Update client fields with new or existing data
        client.name = name || client.name;
        client.description = description || client.description;
        client.email = email || client.email;
        client.phone = phone || client.phone;
        client.image = updatedImage || client.image;
        client.publicId = updatedPublicId || client.publicId;

        // Save the updated section
        await clientSection.save();

        res.status(200).json({ success: true, data: clientSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Team Members
export const getAllClients = async (req, res) => {
    try {
        const clients = await ClientModel.find();
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ message: 'Error fetching team members' });
    }
};
