import mongoose from "mongoose";

const faqDetailsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
})

const faqSchema = new mongoose.Schema({
    sectionTitle: { type: String}, 
    sectionDescription: { type: String },
    clients: [faqDetailsSchema]
})

export const FaqModel = mongoose.model('faq', faqSchema);
