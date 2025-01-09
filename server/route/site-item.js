import express from "express";
import {
    syncSiteItem,
    getAllSiteItems,
    getSingleSiteItemByKey,
    updateSiteItem,
    deleteSiteItem,
} from "../controllers/siteItemController.js";
import tokenVerify from "../middlewares/tokenVerify.js";

const router = express.Router();

router.route("/").get(getAllSiteItems); //.post(tokenVerify, syncSiteItem);

router
    .route("/:key")
    .get(getSingleSiteItemByKey)
    .put(tokenVerify, syncSiteItem)
    .delete(tokenVerify, deleteSiteItem);

export default router;
