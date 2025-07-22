import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MY_PORTFOLIO",
    })
    .then(() => {
      console.log("Connected to database Successfully!");
    })
    .catch((err) => {
      console.log("Error connecting to database:", err);
    });
};
