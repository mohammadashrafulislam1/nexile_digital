import express from "express";
import { upload } from "../Middleware/multer.js";
import { addService, deleteService, getAllServices, getOneService, updateService } from "../Controllers/ServicesController.js";


export const serviceRouter = express.Router();

const uploadFields = [
  { name: 'mainServiceImage', maxCount: 1 },
    { name: 'approach[image]', maxCount: 10 }, // Allow multiple images
    { name: 'process[image]', maxCount: 10 },
    { name: 'why[image]', maxCount: 10 },
    { name: 'tools[image]', maxCount: 10 },  
];


// Route to add a new service with image upload
serviceRouter.post("/", upload.fields(uploadFields), addService);

// Route to update an existing service
serviceRouter.put("/:id", upload.fields(uploadFields), updateService);

// Route to get all services
serviceRouter.get("/", getAllServices);

serviceRouter.get("/:title", getOneService);

// Route to delete a service
serviceRouter.delete("/:id", deleteService);

