const res = require("express/lib/response");
const { reset } = require("nodemon");
const sql = require("../database/config");
const Order = require("../models/order.model");

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orden SET ?", newOrder, (err1, res1) => {
    if (err1) {
      console.log("error: ", err1);
      result(err1, null);
      return;
    }
    result(null, { idOrden: res1.insertId, ...newOrder });
  });
};


Order.createDetail = (newOder, result) => {
  sql.query("INSERT INTO orden SET ?", newOder, (err1, res1) => {
    if (err1) {
      console.log("error: ", err1);
      result(err1, null);
      return;
    }
    result(null, {idOrden: res1.insertId,  ...newOder});
  })
};

Order.createDetailedOrder = (products, result) => {
    sql.query("INSERT INTO detalleOrden(idOrden) SELECT MAX(idOrden) FROM orden", 
      (err2, res2) => {
        if (err2) {
          console.log("error: ", err2);
          result(err2, null);
        return;
      }
    sql.query("INSERT INTO _DetalleOrdenToProducto SET idDetalleOrden=?", res2.insertId, (err3, res3) => {
      if (err3) {
      console.log("error: ", err3);
      result(err3, null);
        return;
    }
  });

    sql.query("UPDATE _DetalleOrdenToProducto SET idProducto=? WHERE idDetalleOrden = ?",[products.id, res2.insertId], (err4, res4) => {
      if (err4) {
        console.log("error: ", err4);
      // result(err1, null);
      return;
  }

    result(null, {idOrden: res4.insertId, idProduct: products.id});
    });
    sql.query("UPDATE detalleOrden SET cantidadProducto=?, costoTotalProducto=?, fechaCreacion=? WHERE idDetalleOrden = ?",[products.cantidadProducto, products.costoTotalProducto, products.fechaCreacion, res2.insertId], (err5, res5) => {
      if (err5) {
        console.log("error: ", err5);
      return;
    }
    result(null, {idOrden: res5.insertId, idProduct: products.id});
      });
    });
  };


Order.findByIdDetailed = (idOrden, result) => {
  sql.query(
    `SELECT idOrden, fechaCreacion, costoTotal, estadoOrden, usuarioCreacion, fechaModificacion, metodoPago FROM orden WHERE idOrden = ${idOrden}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      console.log("Detalle de Orden: ", res);
        sql.query(
          "SELECT idDetalleOrden FROM detalleOrden WHERE idOrden = ?", idOrden,
            (err1, res1) => {
              if (err1) {
                console.log("error: ", err1);
                // 
                return;
              }

              result(null, {Orden: res, idOrden:res1});
            }); 
  });
};

Order.findByIdProductDet = (idDetalleOrden, result) => {
        sql.query(
          "SELECT idProducto FROM _DetalleOrdenToProducto WHERE idDetalleOrden = ?", idDetalleOrden.idDetalleOrden,
            (err2, res2) => {
              if (err2) {
                console.log("error: ", err2);
                result(err2, null);
                return;
              }
              sql.query(
                "SELECT comun FROM productos WHERE idProducto = ?", res2[0].idProducto,
                  (err3, res3) => {
                    if (err3) {
                      console.log("error: ", err3);
                      result(err3, null);
                      return;
                    }
                    console.log(res2)
                    // result(null, {Producto: res3});

                    sql.query(
                      "SELECT cantidadProducto, costoTotalProducto FROM detalleOrden WHERE idDetalleOrden = ?", idDetalleOrden.idDetalleOrden,
                        (err4, res4) => {
                          if (err4) {
                            console.log("error: ", err4);
                            result(err4, null);
                            return;
                          }
                          result(null,  {Cantidad:res4[0].cantidadProducto,Costo: res4[0].costoTotalProducto, Nombre: res3[0].comun});
                  });
          });

          
    });
};






Order.getAll = (result) => {
  let query = "SELECT * FROM orden";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Orders: ", res);
    result(null, res);
  });
};

Order.findById = (idOrden, result) => {
  sql.query(`SELECT * FROM orden WHERE idOrden = ${idOrden}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Se encontró la orden: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = (result) => {
  let query = "SELECT * FROM orden";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Orders: ", res);
    result(null, res);
  });
};

Order.updateById = (idOrden, order, result) => {
  sql.query(
    "UPDATE orden SET estadoOrden = ?, costoTotal = ?, usuarioCreacion = ?, fechaCreacion = ?, fechaModificacion = ?, metodoPago=? WHERE idOrden = ?",
    [order.estadoOrden, order.costoTotal, order.usuarioCreacion, order.fechaCreacion, order.fechaModificacion, order.metodoPago, idOrden],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Se actualizó la orden: ", { idOrden: idOrden, ...order });
      result(null, { idOrden: idOrden, ...order });
    }
  );
};

Order.logicDelete = (id, producto, result) => {
  sql.query(
    `UPDATE orden SET eliminar = ${producto.eliminar} WHERE idOrden = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "No se pudo encontrar, no se puede eliminar" }, null);
        return;
      }

      console.log("Se actualizo el producto: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

module.exports = Order;
