import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get list of available journals
 */
export const getJournals = (req, res) => {
  try {
    const journalsDir = path.join(__dirname, "../journals");

    // Read all PDF files from journals directory
    const files = fs.readdirSync(journalsDir).filter((file) => file.endsWith(".pdf"));

    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No journals found",
      });
    }

    // Format journal data
    const journals = files.map((fileName) => ({
      fileName,
      displayName: fileName.replace(".pdf", ""),
      downloadUrl: `/journals/${encodeURIComponent(fileName)}`,
    }));

    res.status(200).json({
      success: true,
      count: journals.length,
      journals: journals.sort((a, b) => b.displayName.localeCompare(a.displayName)),
    });
  } catch (error) {
    console.error("Error reading journals:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching journals",
      error: error.message,
    });
  }
};

/**
 * Download a specific journal PDF
 */
export const downloadJournal = (req, res) => {
  try {
    const fileName = req.params.fileName;
    const journalsDir = path.join(__dirname, "../journals");
    const filePath = path.join(journalsDir, fileName);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(journalsDir)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "Journal not found",
      });
    }

    // Send file as download
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Download error:", err);
      }
    });
  } catch (error) {
    console.error("Error downloading journal:", error);
    res.status(500).json({
      success: false,
      message: "Error downloading journal",
      error: error.message,
    });
  }
};
