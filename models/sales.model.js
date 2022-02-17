const Sale = function (sale) {
  this.estadoOrden = sale.estadoOrden;
  this.costoTotal = sale.costoTotal;
  this.usuarioCreacion = sale.usuarioCreacion;
  this.fechaCreacion = sale.fechaCreacion;
  this.fechaModificacion = sale.fechaModificacion;
};

module.exports = Sale;
