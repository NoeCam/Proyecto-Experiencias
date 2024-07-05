import server from "./src/server.js";
import dotenv from "dotenv";
import getPool from "./src/database/getPool.js";

dotenv.config();
const PORT = process.env.PORT || 3020;

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
