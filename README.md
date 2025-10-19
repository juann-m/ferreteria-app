# Ferretería App 🔨

Proyecto de Sistema de Gestión de Ferretería para Taller de Programación II

## Descripción

Aplicación web para la gestión de una ferretería que permite:
- Visualizar catálogo de productos
- Buscar y filtrar productos por categoría
- Gestionar carrito de compras
- Realizar compras y actualizar inventario

## Características

### Catálogo de Productos
- 15 productos organizados en 5 categorías:
  - Herramientas
  - Electricidad
  - Plomería
  - Pintura
  - Construcción
- Información detallada de cada producto (nombre, descripción, precio, stock)
- Alertas de stock bajo

### Funcionalidades
- **Búsqueda**: Buscar productos por nombre o descripción
- **Filtrado**: Filtrar productos por categoría
- **Carrito de Compras**: Agregar, modificar cantidades y eliminar productos
- **Checkout**: Finalizar compra con actualización automática de inventario
- **Responsive**: Diseño adaptable a diferentes dispositivos

## Instalación y Uso

1. Clonar el repositorio:
```bash
git clone https://github.com/juann-m/ferreteria-app.git
cd ferreteria-app
```

2. Abrir el archivo `index.html` en un navegador web:
```bash
# En Linux/Mac:
open index.html

# En Windows:
start index.html

# O usar un servidor local (recomendado):
python -m http.server 8000
# Luego abrir http://localhost:8000 en el navegador
```

## Estructura del Proyecto

```
ferreteria-app/
├── index.html      # Página principal
├── styles.css      # Estilos de la aplicación
├── app.js          # Lógica de la aplicación
└── README.md       # Documentación
```

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)

## Funcionalidades Detalladas

### Gestión de Productos
- Cada producto tiene: ID, nombre, categoría, descripción, precio y stock
- Los productos se muestran en tarjetas con toda su información
- Indicador visual cuando el stock es bajo (< 10 unidades)

### Carrito de Compras
- Agregar productos con cantidad personalizada
- Modificar cantidades desde el carrito
- Eliminar productos del carrito
- Cálculo automático del total
- Validación de stock disponible

### Proceso de Compra
- Visualización del resumen de compra
- Confirmación antes de finalizar
- Actualización automática del inventario tras la compra
- Mensajes de confirmación

## Autor

Proyecto desarrollado para Taller de Programación II

## Licencia

Este proyecto es de código abierto y está disponible para fines educativos.
