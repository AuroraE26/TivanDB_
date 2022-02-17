const DetalleOrden = function (detalleOrden) {
  this.idOrden = detalleOrden.idOrden;
  this.cantidadPorducto = detalleOrden.cantidadPorducto;
  this.costoTotalProducto = detalleOrden.costoTotalProducto;
  this.fechaCreacion = detalleOrden.fechaCreacion;
};

module.exports = DetalleOrden;
