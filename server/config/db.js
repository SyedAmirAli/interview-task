import mongoose from "mongoose";

export const mongoBDConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connect successfully\n`);
    } catch (error) {
        console.log(`${error.message}`);
    }
};
