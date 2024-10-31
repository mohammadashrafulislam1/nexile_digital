import express from "express";
import { upload } from "../Middleware/multer.js";
import { addTechStack, getTechStack, updateTechStack, updateTechStack } from "../Controllers/TechStackController.js";

export const techStackRouter = express.Router();

// add API:
techStackRouter.post('/', upload.single('image'), addTechStack)
techStackRouter.put('/:id', upload.single('image'), updateTechStack)
techStackRouter.get('/', getTechStack)