const sql = require("../database/config");

const Order = function(order) {
  this.estadoOrden = order.estadoOrden;
  this.costoTotal = order.costoTotal;
  this.usuarioCreacion = order.usuarioCreacion;
  this.fechaCreacion = order.fechaCreacion;
  this.fechaModificacion = order.fechaModificacion;
};

module.exports = Order;
