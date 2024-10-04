import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import routes from "./routes/index.js";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const server = express();

server.use(express.json());
server.use(cors());
server.use(fileUpload());

const __dirname = dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = path.join(__dirname, "uploads");
server.use("/uploads", express.static(UPLOADS_DIR));

server.use(routes);

server.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

server.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

export default server;
