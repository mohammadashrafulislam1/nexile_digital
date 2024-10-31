import express from "express";
import { upload } from "../Middleware/multer.js";
import { addTechStack } from "../Controllers/TechStackController.js";

export const techStackRouter = express.Router();

// add API:
techStackRouter.post('/', upload.single('image'), addTechStack)