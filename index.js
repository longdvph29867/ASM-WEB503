import express from "express";
import { connectDB } from "./src/utils/db.js";
import router from "./src/routes/index.js";
import cors from "cors";

const app = express();

app.use(express.json());

connectDB();
app.use("/", cors({ origin: "*" }), router);

app.listen(8000, () => {
  console.log("Listen", 8000);
});
