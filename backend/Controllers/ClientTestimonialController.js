import fs from 'fs';
import { cloudinary } from '../utils/cloudinary.js';
import { ClientTestimonialModel } from '../Model/ClientTestimonialModel.js';

// Helper function for uploading images
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'nexile digital/clientTestimonial'
        });
        fs.unlinkSync(filePath); // Delete temp file
        return { url: result.secure_url, public_id: result.public_id };
    } catch (error) {
        throw new Error('Error uploading image');
    }
};

// Add a new client testimonial
export const addClientTestimonial = async (req, res) => {
    try {
        const { sectionTitle, sectionDescription, testimonials } = req.body;

        // Ensure required fields are present
        if (!sectionTitle || !testimonials) {
            return res.status(400).json({ success: false, message: 'Section title and testimonials are required.' });
        }

        // Process testimonials array
        const processedTestimonials = await Promise.all(testimonials.map(async (testimonial) => {
            let clientImageData = null;
            if (req.files && req.files.clientImage) {
                clientImageData = await uploadImage(req.files.clientImage[0].path);
            }

            return {
                testimonialText: testimonial.testimonialText,
                clientName: testimonial.clientName,
                clientImage: clientImageData ? clientImageData.url : testimonial.clientImage,
                publicId: clientImageData ? clientImageData.public_id : testimonial.publicId,
                clientDescription: testimonial.clientDescription,
                rating: testimonial.rating,
                socialLinks: testimonial.socialLinks,
                websiteOrVideoLink: testimonial.websiteOrVideoLink
            };
        }));

        const newTestimonial = new ClientTestimonialModel({
            sectionTitle,
            sectionDescription,
            testimonials: processedTestimonials,
        });

        await newTestimonial.save();
        res.status(201).json({ success: true, message: 'Client testimonial added successfully', newTestimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an existing client testimonial
export const updateClientTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { sectionTitle, sectionDescription, testimonials } = req.body;

        const testimonial = await ClientTestimonialModel.findById(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }

        // Update section title and description
        testimonial.sectionTitle = sectionTitle || testimonial.sectionTitle;
        testimonial.sectionDescription = sectionDescription || testimonial.sectionDescription;

        // Process testimonials array for updates
        if (testimonials) {
            testimonial.testimonials = await Promise.all(testimonials.map(async (updatedTestimonial, index) => {
                let existingTestimonial = testimonial.testimonials[index] || {}; // Use existing testimonial or create an empty object
                let clientImageData = null;

                // If a new image is uploaded, delete the old one
                if (req.files && req.files.clientImage) {
                    if (existingTestimonial.publicId) {
                        await cloudinary.uploader.destroy(existingTestimonial.publicId);
                    }
                    clientImageData = await uploadImage(req.files.clientImage[0].path);
                }

                return {
                    testimonialText: updatedTestimonial.testimonialText || existingTestimonial.testimonialText,
                    clientName: updatedTestimonial.clientName || existingTestimonial.clientName,
                    clientImage: clientImageData ? clientImageData.url : existingTestimonial.clientImage,
                    publicId: clientImageData ? clientImageData.public_id : existingTestimonial.publicId,
                    clientDescription: updatedTestimonial.clientDescription || existingTestimonial.clientDescription,
                    rating: updatedTestimonial.rating !== undefined ? updatedTestimonial.rating : existingTestimonial.rating, // Allow overriding with new data
                    socialLinks: updatedTestimonial.socialLinks || existingTestimonial.socialLinks,
                    websiteOrVideoLink: updatedTestimonial.websiteOrVideoLink || existingTestimonial.websiteOrVideoLink,
                };
            }));
        }

        await testimonial.save();
        res.status(200).json({ success: true, message: 'Client testimonial updated successfully', testimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get all client testimonials
export const getAllClientTestimonials = async (req, res) => {
    try {
        const testimonials = await ClientTestimonialModel.find();
        res.status(200).json({ success: true, testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single client testimonial by ID
export const getClientTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await ClientTestimonialModel.findById(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }
        res.status(200).json({ success: true, testimonial });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a client testimonial by ID
export const deleteClientTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await ClientTestimonialModel.findById(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found.' });
        }

        // Delete associated images from Cloudinary
        for (const t of testimonial.testimonials) {
            if (t.publicId) {
                await cloudinary.uploader.destroy(t.publicId);
            }
        }

        await testimonial.remove();
        res.status(200).json({ success: true, message: 'Client testimonial deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
