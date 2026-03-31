import express from "express";
import { getJournals, downloadJournal } from "../controllers/journalController.js";

const router = express.Router();

console.log("📚 Journal routes module loaded");

// ============= PUBLIC ROUTES =============

// Get list of all available journals
router.get("/", getJournals);

// Download/View a specific journal PDF
router.get("/:fileName", downloadJournal);

export default router;
