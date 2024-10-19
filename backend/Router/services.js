import express from "express";
import { upload } from "../Middleware/multer.js";
import { addService, deleteService, getAllServices, getOneService, updateService } from "../Controllers/ServicesController.js";


export const serviceRouter = express.Router();

// Route to add a new service with image upload
serviceRouter.post("/", upload.single("image"), addService);

// Route to update an existing service
serviceRouter.put("/:id", upload.single("image"), updateService);

// Route to get all services
serviceRouter.get("/", getAllServices);

serviceRouter.get("/:title", getOneService);

// Route to delete a service
serviceRouter.delete("/:id", deleteService);
