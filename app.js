// importo desde mi misma carpeta server de src la configuración del servidor
import server from './src/server.js';

const PORT = 3001;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
  console.log(`HOST: ${HOST}`);
  console.log(`PORT: ${PORT}`);
});
