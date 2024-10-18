import express from "express";
import { upload } from "../Middleware/multer.js";
import { addAboutUs, getAboutUs, updateAboutUs } from "../Controllers/AboutController.js";

export const aboutRouter = express.Router();

// Route to add About Us
aboutRouter.post(
    "/",
    upload.fields([
        { name: "storyImage", maxCount: 1 },    // Image for the story
        { name: "missionImage", maxCount: 1 },   // Image for the mission
        { name: "visionImage", maxCount: 1 }     // Image for the vision
    ]),
    addAboutUs
);

// Route to update About Us
aboutRouter.put(
    "/",
    upload.fields([
        { name: "storyImage", maxCount: 1 },    // Image for the story
        { name: "missionImage", maxCount: 1 },   // Image for the mission
        { name: "visionImage", maxCount: 1 }     // Image for the vision
    ]),
    updateAboutUs
);

// get about:
aboutRouter.get('/', getAboutUs)

export default aboutRouter;
