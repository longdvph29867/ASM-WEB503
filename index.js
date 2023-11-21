import express from "express";
import { connectDB } from "./src/utils/db.js";
import router from "./src/routes/index.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB2;
const app = express();

app.use(express.json());

connectDB();
app.use("/", cors({ origin: "*" }), router);

app.listen(PORT, () => {
  console.log("Listen", PORT);
});
