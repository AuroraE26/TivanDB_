const Order = function(order) {
  
  this.estadoOrden = order.estadoOrden;
  this.costoTotal = order.costoTotal;
  this.usuarioCreacion = order.usuarioCreacion;
  this.fechaCreacion = order.fechaCreacion;
  this.fechaModificacion = order.fechaModificacion;
  this.metodoPago = order.metodoPago;
};

module.exports = Order;
