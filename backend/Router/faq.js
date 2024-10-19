import express from "express";
import { addFaq, getAllFaq, updateFaq } from "../Controllers/FaqController.js";

export const faqRouter = express.Router();

// add faq:
faqRouter.post('/', addFaq)

// update faq:
faqRouter.put('/:id/:faqId', updateFaq)

// get all faq:
faqRouter.get('/', getAllFaq)