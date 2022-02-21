const sql = require("../database/config");
const Order = require("../models/order.model");

Order.create = (newSale, result) => {
  sql.query("INSERT INTO orden SET ?", newSale, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Se creo orden: ", { idOrden: res.insertId, ...newSale });
    result(null, { idOrden: res.insertId, ...newSale });
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
    console.log("products: ", res);
    result(null, res);
  });
};

Order.updateById = (idOrden, sale, result) => {
  sql.query(
    "UPDATE orden SET estadoOrden = ?, costoTotal = ?, usuarioCreacion = ?, fechaCreacion = ?, fechaModificacion = ? WHERE idOrden = ?",
    [
      sale.estadoOrden,
      sale.costoTotal,
      sale.usuarioCreacion,
      sale.fechaCreacion,
      sale.fechaModificacion,
      idOrden,
    ],
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

      console.log("Se actualizó la orden: ", { idOrden: idOrden, ...sale });
      result(null, { idOrden: idOrden, ...sale });
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
