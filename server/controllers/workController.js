import asyncHandler from "express-async-handler";
import Work from "../models/Work.js";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/**
 * @DESC Get all works data
 * @ROUTE /api/v1/work
 * @method GET
 * @access public
 */
export const getAllWorks = asyncHandler(async (req, res) => {
    const works = await Work.find();

    if (works.length === 0) {
        return res.status(404).json({ message: "Work data not found" });
    }

    res.status(200).json(works);
});

/**
 * @DESC Get Single work data
 * @ROUTE /api/v1/work/:id
 * @method GET
 * @access public
 */
export const getSingleWork = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const work = await Work.findById(id);

    if (!work) {
        return res.status(404).json({ message: "Work data not found" });
    }

    res.status(200).json(work);
});

/**
 * @DESC Create new Work
 * @ROUTE /api/v1/work
 * @method POST
 * @access public
 */
export const createWork = asyncHandler(async (req, res) => {
    try {
        const title = req.body.title;
        const tags = JSON.parse(req.body.tags); // Parse tags from JSON string
        const isLatest = req.body.isLatest === "true"; // Convert to boolean
        const status = req.body.status;
        const imageFile = req.file;

        // Validate request data
        if (!title || !tags || !imageFile) {
            return res
                .status(400)
                .json({ message: "Title, image, and tags are required." });
        }

        if (!Array.isArray(tags) || tags.some((tag) => !tag.label)) {
            return res.status(400).json({
                message: "Tags must be an array of objects with a label.",
            });
        }

        // Generate a unique filename for the image
        const uniqueFilename = `${uuidv4()}-${imageFile.originalname}`;
        const imagePath = path.join(
            "public",
            "uploads",
            "work",
            uniqueFilename
        );

        // Save the image file to the uploads directory
        fs.writeFileSync(imagePath, imageFile.buffer);

        // Create a new work entry
        const work = await Work.create({
            title,
            tags,
            isLatest,
            status,
            image: imagePath,
        });

        res.status(201).json(work);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error!" });
    }
});

/**
 * @DESC Update Work
 * @ROUTE /api/v1/work/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateWork = asyncHandler(async (req, res) => {
    try {
        const title = req.body.title;
        const tags = JSON.parse(req.body.tags); // Parse tags from JSON string
        const isLatest = req.body.isLatest === "true"; // Convert to boolean
        const status = req.body.status;
        const imageFile = req.file;

        const { id } = req.params;

        if (!id) {
            return res.status(404).json({ message: "ID is must required" });
        }
        // Find the existing work by ID
        const work = await Work.findById(id);

        if (!work) {
            return res.status(404).json({ message: "Work data not found" });
        }

        // Validate tags if provided
        if (tags && (!Array.isArray(tags) || tags.some((tag) => !tag.label))) {
            return res.status(400).json({
                message: "Tags must be an array of objects with a label",
            });
        }

        // Handle image upload if a new image is provided
        let imagePath = work.image; // Default to the existing image path
        if (imageFile) {
            // Delete the previous image file if it exists
            if (work.image && fs.existsSync(work.image)) {
                fs.unlinkSync(work.image);
            }

            // Generate a new unique filename and store the new image
            const uniqueFilename = `${uuidv4()}-${imageFile.originalname}`;
            imagePath = path.join("public", "uploads", "work", uniqueFilename);

            // Ensure the directory exists before saving the new image
            const imageDirectory = path.dirname(imagePath);
            if (!fs.existsSync(imageDirectory)) {
                fs.mkdirSync(imageDirectory, { recursive: true });
            }

            // Save the new image file
            fs.writeFileSync(imagePath, imageFile.buffer);
        }

        // Update the work fields
        work.title = title || work.title;
        work.image = imagePath;
        work.tags = tags || work.tags;
        work.isLatest = isLatest !== undefined ? isLatest : work.isLatest;
        work.status = status !== undefined ? status : work.status;

        // Save the updated work
        await work.save();

        // Return the updated work data
        return res.status(200).json(work);
    } catch (error) {
        return res
            .status(403)
            .json({ message: "Unknown Server Error Occurred." });
    }
});

/**
 * @DESC Delete Work
 * @ROUTE /api/v1/work/:id
 * @method DELETE
 * @access public
 */
export const deleteWork = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const work = await Work.findByIdAndDelete(id);

        if (work && work.image) {
            fs.unlinkSync(work.image);
        }

        return res.status(200).json(work);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Failed to delete record by unknown error" });
    }
});
