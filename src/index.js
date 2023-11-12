import express from "express";
import { connectDB } from "./utils/db.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

connectDB();
routes(app);
app.listen(8000, () => {
  console.log("Listen", 8000);
});
