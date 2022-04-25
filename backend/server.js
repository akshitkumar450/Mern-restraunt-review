import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/dbConfig.js";
import cors from "cors";
import restroRoutes from "./routes/restroRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to db
connectDB();

app.use("/api/v1/restros", restroRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/review", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running");
});
