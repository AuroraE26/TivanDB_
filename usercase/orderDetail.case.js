const sql = require("../database/config");
const OrderDetail = require("../models/orderDetail.model");

OrderDetail.create = (newDetalle, result) => {
  sql.query("INSERT INTO detalleOrden SET ?", newDetalle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order detail: ", {
      idDetalleOrden: res.insertId,
      ...newDetalle,
    });
    result(null, { idDetalleOrden: res.insertId, ...newDetalle });
  });
};



OrderDetail.findById = (idDetalleOrden, result) => {
  sql.query(
    `SELECT * FROM detalleOrden WHERE idDetalleOrden = ${idDetalleOrden}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found detalle de Orden: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

OrderDetail.getAll = (result) => {
  let query = "SELECT * FROM detalleOrden";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Detalle Orden: ", res);
    result(null, res);
  });
};

OrderDetail.updateById = (idDetalleOrden, detalleOrden, result) => {
  sql.query(
    "UPDATE detalleOrden SET idOrden = ?, cantidadProducto = ?, costoTotalProducto = ?, fechaCreacion = ?  WHERE idDetalleOrden = ?",
    [
      detalleOrden.idOrden,
      detalleOrden.cantidadProducto,
      detalleOrden.costoTotalProducto,
      detalleOrden.fechaCreacion,
      idDetalleOrden,
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

      console.log("Se actualizó el detalle de orden: ", {
        idDetalleOrden: idDetalleOrden,
        ...detalleOrden,
      });
      result(null, { idDetalleOrden: idDetalleOrden, ...detalleOrden });
    }
  );
};

module.exports = OrderDetail;
