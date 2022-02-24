const Product = function (product) {
  this.comun = product.comun;
  this.clave = product.clave;
  this.cantidad = product.cantidad;
  this.precio = product.precio;
  this.cantidadMinima = product.cantidadMinima;
  this.descripcion = product.descripcion;
  this.codigoBarras = product.codigoBarras;
  this.image = product.image;
  this.favorito = product.favorito;
  this.eliminar = product.eliminar;
  this.userCreacion = product.userCreacion;
  this.fechaCreacion = product.fechaCreacion;
  this.fechaModificacion = product.fechaModificacion;
};

module.exports = Product;
