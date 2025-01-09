import express from "express";
import {
    getAllWorks,
    getSingleWork,
    createWork,
    deleteWork,
    updateWork,
} from "../controllers/workController.js";
import tokenVerify from "../middlewares/tokenVerify.js"; // Assuming tokenVerify middleware is located here
import { upload } from "../config/storage.js";

const router = express.Router();

router
    .route("/")
    .get(getAllWorks)
    .post(tokenVerify, upload.single("file"), createWork);
router
    .route("/:id")
    .get(getSingleWork)
    .delete(tokenVerify, deleteWork)
    .put(tokenVerify, upload.single("file"), updateWork);

export default router;
