const sql = require("../database/config");

const OrderDetail = function(orderDetail) {
  this.idOrden = orderDetail.idOrden;
  this.cantidadProducto = orderDetail.cantidadProducto;
  this.costoTotalProducto = orderDetail.costoTotalProducto;
  this.fechaCreacion = orderDetail.fechaCreacion;
};

  module.exports = OrderDetail;
