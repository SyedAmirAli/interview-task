import express from "express";
import {
    createUser,
    deleteUser,
    getAllUser,
    getSingleUser,
    updateUser,
} from "../controllers/userController.js";
import tokenVerify from "../middlewares/tokenVerify.js";

const router = express.Router();

// create route
router.use(tokenVerify);

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);

// export default router
export default router;
