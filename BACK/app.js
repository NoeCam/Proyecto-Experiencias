import server from "./src/server.js";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3001;

server.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor de Experiencias Diferentes!');
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});