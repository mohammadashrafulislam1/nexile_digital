import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    logo: { type: String, required: true },
    menu: [{ type: String, required: true }], 
    title: { type: String, required: true },
    description: { type: String, required: true },
    googleReview: { type: String, required: true },
    nexileReview: { type: String, required: true },
    clients: { type: String, required: true },
    experience: { type: String, required: true }
});

export const HeroModel = mongoose.model('hero', heroSchema);
