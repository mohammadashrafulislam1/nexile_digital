import express from "express";
import { createContact } from "../Controllers/ContactController.js";

export const contactRouter = express.Router();


contactRouter.post('/', createContact)