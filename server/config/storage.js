import multer from "multer";

// Configure multer for file handling
const storage = multer.memoryStorage(); // Use memory storage for demonstration
export const upload = multer({ storage });
