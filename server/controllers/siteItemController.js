import SiteItem from "../models/SiteItem.js";

// Create or update a SiteItem based on its unique key
export const syncSiteItem = async (req, res) => {
    try {
        const { key } = req.params; // Get key from URL parameters
        const value = req.body; // Get the value from the request body

        // console.log({ value, key });
        // return res.status(500).json({ message: "TESTING..." });
        const existingSiteItem = await SiteItem.findOne({ key });

        if (existingSiteItem) {
            // If the SiteItem exists, update it
            existingSiteItem.value = value; // Update the value property
            const updatedSiteItem = await existingSiteItem.save();
            return res.status(200).json(updatedSiteItem);
        } else {
            // If it doesn't exist, create a new SiteItem
            const newSiteItem = new SiteItem({ key, value });
            const savedSiteItem = await newSiteItem.save();
            return res.status(201).json(savedSiteItem);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Read all SiteItems
export const getAllSiteItems = async (req, res) => {
    try {
        const siteItems = await SiteItem.find();
        res.status(200).json(siteItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read a single SiteItem by its unique key
export const getSingleSiteItemByKey = async (req, res) => {
    try {
        const { key } = req.params; // Get key from URL parameters
        const siteItem = await SiteItem.findOne({ key });
        if (!siteItem)
            return res.status(404).json({ message: "SiteItem not found" });
        res.status(200).json(siteItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a SiteItem
export const updateSiteItem = async (req, res) => {
    try {
        const { key } = req.params; // Get key from URL parameters
        const { value } = req.body; // Get the value from the request body
        const updatedSiteItem = await SiteItem.findOneAndUpdate(
            { key },
            { value },
            { new: true }
        );
        if (!updatedSiteItem)
            return res.status(404).json({ message: "SiteItem not found" });
        res.status(200).json(updatedSiteItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a SiteItem
export const deleteSiteItem = async (req, res) => {
    try {
        const { key } = req.params; // Get key from URL parameters
        const deletedSiteItem = await SiteItem.findOneAndDelete({ key });
        if (!deletedSiteItem)
            return res.status(404).json({ message: "SiteItem not found" });
        res.status(200).json({ message: "SiteItem deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
