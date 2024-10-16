import express from "express";
import { upload } from "../Middleware/multer.js";
import { addHero } from "../Controllers/HeroController.js";

export const heroRouter = express.Router();

heroRouter.post('/', upload.single('logo'), addHero)