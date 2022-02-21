const OrderDetail = function(orderDetail) {
  
  this.idOrden = orderDetail.idOrden;
  this.idProducto = orderDetail.idProducto;
  this.cantidadProducto = orderDetail.cantidadProducto;
  this.costoTotalProducto = orderDetail.costoTotalProducto;
  this.fechaCreacion = orderDetail.fechaCreacion;
};

  module.exports = OrderDetail;
