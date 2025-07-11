import mongoose from "mongoose";

const DbConnection = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database Already Connected");
      return;
    }
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;
