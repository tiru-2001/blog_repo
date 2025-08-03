import mongoose from "mongoose";
import config from "./config";
const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log(`connected successfully to database`.bgGreen);
  } catch (e: unknown) {
    console.log(e);
  }
};

export default connectToDB;
