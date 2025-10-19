import express from 'express';
import morgan from 'morgan';
import { ProductController } from './controllers/product.controller.js';

const server = express();

// Aplicar Morgan como middlewarea
// morgan sirve para llevar un registro de las peticiones y respuestas que llegan  o emite el servidor

// Lo que hace server.use es decirle al servidor que use la extensión morgan. 
// Luego lo que está dentro del parámetro de morgan es el formato de salida del registro de las peticiones
server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Middleware para parsear JSON en el body de las solicitudes
server.use(express.json());


server.post('/api/product', ProductController.createProduct);
server.get('/api/product/empanada', ProductController.getByBody);

server.get('/api/product/empanada/:id', ProductController.getById);

//enpoints para DELETE y PATCH

server.delete('/api/product/:id', ProductController.deleteProduct);

server.patch('/api/product/:id', ProductController.updateProduct);

export default server;
