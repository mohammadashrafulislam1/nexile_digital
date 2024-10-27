import express from "express";
import { addWork, deleteWork, getAllShowcases, getShowcaseById, getShowcaseByTitle, updateWork } from "../Controllers/WorksController.js";
import { upload } from "../Middleware/multer.js";

export const workRouter = express.Router();

// Route for adding a new work (including showcase)
workRouter.post(
    '/',
    upload.fields([
      { name: 'images', maxCount: 10 }, // Max 10 general project images
      { name: 'techStackImage', maxCount: 10 }, // Max 10 tech stack images
    ]),
    addWork
  );
  
  // Route for updating an existing showcase
  workRouter.put(
    '/:id/:showcaseId',
    upload.fields([
      { name: 'images', maxCount: 10 }, // Max 10 new general project images
      { name: 'techStackImage', maxCount: 10 }, // Max 10 new tech stack images
    ]),
    updateWork
  );

  // Route for getting all showcases
workRouter.get('/', getAllShowcases);

// Route for getting a specific showcase
workRouter.get('/:id', getShowcaseById);

// Route for deleting a specific showcase
workRouter.delete('/:id', deleteWork);

// get showcase by title
workRouter.get("/:title", getShowcaseByTitle);
  