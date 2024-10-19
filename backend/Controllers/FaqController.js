import { FaqModel } from "../Model/FaqModel.js";


// Controller to add a new FAQ section with FAQs
export const addFaq = async (req, res) => {
    try {
        const { sectionTitle, sectionDescription, faqs } = req.body;

        // Create a new FAQ section
        const newFaqSection = new FaqModel({
            sectionTitle,
            sectionDescription,
            clients: faqs // Array of FAQs (title and description) passed from the request
        });

        // Save the new FAQ section to the database
        await newFaqSection.save();

        res.status(201).json({ success: true, data: newFaqSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Controller to update an existing FAQ section or individual FAQ
export const updateFaq = async (req, res) => {
    try {
        const { id } = req.params; // FAQ section ID
        const { faqId, sectionTitle, sectionDescription, title, description } = req.body; // FAQ details

        // Find the FAQ section by ID
        const faqSection = await FaqModel.findById(id);
        if (!faqSection) {
            return res.status(404).json({ success: false, message: 'FAQ section not found' });
        }

        // Update section title and description if provided
        faqSection.sectionTitle = sectionTitle || faqSection.sectionTitle;
        faqSection.sectionDescription = sectionDescription || faqSection.sectionDescription;

        // If faqId is provided, update the individual FAQ within the section
        if (faqId) {
            const faq = faqSection.clients.id(faqId);
            if (!faq) {
                return res.status(404).json({ success: false, message: 'FAQ not found' });
            }

            // Update the individual FAQ fields with new or existing data
            faq.title = title || faq.title;
            faq.description = description || faq.description;
        }

        // Save the updated FAQ section
        await faqSection.save();

        res.status(200).json({ success: true, data: faqSection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all services
export const getAllFaq = async (req, res) => {
    try {
      const faqs = await FaqModel.find();
      res.status(200).json(faqs);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Error fetching services' });
    }
  };


// Delete hero with id
export const deleteFaq = async (req, res) => {
    try {
      const { id } = req.params; 
      const existingFaq = await FaqModel.findById(id);
      if (!existingFaq) {
        return res.status(404).json({ message: 'Faq not found' });
      }
  
      // Delete the Faq from the database
      await FaqModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Faq deleted successfully' });
    } catch (error) {
      console.error('Error deleting Faq:', error);
      res.status(500).json({ message: 'Error deleting Faq' });
    }
  };