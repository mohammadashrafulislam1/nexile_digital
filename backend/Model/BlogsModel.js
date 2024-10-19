import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
    title: { type: String}, 
    category: { type: String },
    image: { type: String },
    public_id: { type: String },
    description: { type: String}, 
    metaTitle: { type: String}, 
    metaDescription: { type: String}, 
    tags: [{ type: String}], 
    created_at: {type: Data}
})

export const BlogsModel = mongoose.model('blogs', blogsSchema);
