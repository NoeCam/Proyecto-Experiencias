import express from "express";
import path from "path";
import fileUpload from "express-fileupload";
import cors from "cors";
import routes from "./routes/index.js";

const server = express();
const PUBLIC_FOLDER = path.join(process.cwd(), "public");

server.use(express.json());
server.use(cors());
server.use(fileUpload());

server.use(express.static(PUBLIC_FOLDER));

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
