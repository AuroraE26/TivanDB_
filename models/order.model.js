const sql = require("../database/config");

const Order = function(order) {
  this.estadoOrden = order.estadoOrden;
  this.costoTotal = order.costoTotal;
  this.usuarioCreacion = order.usuarioCreacion;
  this.fechaCreacion = order.fechaCreacion;
  this.fechaModificacion = order.fechaModificacion;
};

Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orden SET ?", newOrder, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Se creo orden: ", { idOrden: res.insertId, ...newOrder });
      result(null, { idOrden: res.insertId, ...newOrder });
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
      "UPDATE orden SET estadoOrden = ?, costoTotal = ?, usuarioCreacion = ?, fechaCreacion = ?, fechaModificacion = ? WHERE idOrden = ?",
      [order.estadoOrden, order.costoTotal, order.usuarioCreacion, order.fechaCreacion, order.fechaModificacion, idOrden],
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


  module.exports = Order;
