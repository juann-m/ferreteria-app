import { Product } from '../models/product.model.js';
import { DataBaseRepository } from '../repositories/json.repository.js';

const database = new DataBaseRepository('./database/ferreteria.db.json'); 

export const ProductController = 


{getById: async (req, res) => {
    const idParam = req.params.id;
   
    try {
      const respondeData = await database.getById(idParam);

      res.json({
        status: 200,
        OK: true,
        message: 'Existe el producto',
        payload: respondeData,
      });
    } catch (error) {
      res.status(404).json({ 
        status: 404,
        OK: false,
        message: `No existe el producto con el id ${idParam}`,
        payload: null,
      });
    }
  },
    getByBody: async (req, res) => {
    const id = req.body.id;
     

    try {
      const respondeData = await database.getById(id);

      res.json({
        status: 200,
        OK: true,
        message: 'Existe el producto',
        payload: respondeData,
      });
    } catch (error) {
      res.status(404).json({ 
        status: 404,
        OK: false,
        message: `No existe el producto con el id ${id}`,
        payload: null,
      });
    }
  },

  createProduct: async (req, res) => {
    try {
            
      const { nombre, descripcion, cantidad, tags } = req.body;
      const newProduct = new Product(nombre, descripcion, cantidad, tags);
      const response = await database.createProduct(newProduct);

      res.status(201).json({ 
        status: 201,
        OK: true,
        message: 'Producto creado con éxito',
        payload: response,
      });
    } catch (error) {
      res.status(500).json({ 
        status: 500,
        OK: false,
        message: 'Error al crear el producto',
        payload: null,
      });
    }
  },


deleteProduct: async (req, res) => {
  const idParam = req.params.id;
 
  try {
    
    const producto = await database.getById(idParam);
      
    
    const result = await database.deleteProduct(producto);
   
    
    res.json({
      status: 200,
      OK: true,
      message: `Producto con id ${idParam} eliminado con éxito`,
      payload: producto,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      OK: false,
      message: `No existe el producto con el id ${idParam}`,
      payload: null,
    });
  }
},
};
