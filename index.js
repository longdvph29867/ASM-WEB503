import express from "express";
import { connectDB } from "./src/utils/db.js";
import router from "./src/routes/index.js";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
dotenv.config();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;
const app = express();

app.use(express.json());

connectDB(URI_DB);
app.use("/", cors({ origin: "*" }), router);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
      {
        url: "https://asm-web-503.vercel.app/",
      },
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"],
  cors: true,
};

const spacs = swaggerJsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

app.listen(PORT, () => {
  console.log("Listen", PORT);
});
