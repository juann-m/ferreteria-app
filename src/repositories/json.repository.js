import fs from 'fs/promises';
import { Product } from '../models/product.model.js';

export class DataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  async getAllData() {
    const data = await fs.readFile(this.path, {encoding: 'utf-8'});
    return JSON.parse(data);
  }

  async getById(idParam) {
    let data = await this.getAllData();
    if (!data) throw new Error('No hay datos');
    const filterData = data.filter((product) => product.id === idParam);
    if (filterData.length === 0) throw new Error('No hay producto con el id proporcionado');
    
    const objetoPlain = filterData[0];
    const producto = new Product(
      objetoPlain.nombre,
      objetoPlain.descripcion,
      objetoPlain.cantidad,
      objetoPlain.tags,
      objetoPlain.id
    );
    return producto;
  }
    // return filterData[0];

   async createProduct(product) {
    let data = await this.getAllData();
    data.push(product);
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), {encoding: 'utf-8'});
    return {
      idProduct: product.id,
    };
  }

  // filterData: Crea un nuevo array con productos que cumplan la condición
    // product.id !== id: Condición = "incluir solo productos cuyo ID sea DIFERENTE al que queremos eliminar"
    // devuelve: Array sin el producto a eliminar

  async deleteProduct(producto) {
    console.log('🗑️ REPO - deleteProduct llamado con:', producto); // DEBUG
    const id = producto.id;
    console.log('🆔 ID a eliminar:', id); // DEBUG
    
    let data = await this.getAllData();
    console.log('📊 Datos antes del filtrado:', data.length, 'productos'); // DEBUG
    
    const filteredData = data.filter((product) => product.id !== id);
    console.log('📊 Datos después del filtrado:', filteredData.length, 'productos'); // DEBUG
    
    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2), {encoding: 'utf-8'});
    console.log('💾 Archivo actualizado'); // DEBUG
    
    return {
      idProduct: id,
    };
  }
}
