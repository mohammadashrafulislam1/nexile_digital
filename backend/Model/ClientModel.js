import mongoose from "mongoose";

const clientDetailsSchema = new mongoose.Schema({
    image: { type: String}, 
    publicId: { type: String}, 
    name: { type: String },
    description: { type: String },
    email: { type: String },
    phone: { type: String },
})

const clientSchema = new mongoose.Schema({
    sectionTitle: { type: String}, 
    sectionDescription: { type: String },
    clients: [clientDetailsSchema]
})

export const ClientModel = mongoose.model('Client', clientSchema);
