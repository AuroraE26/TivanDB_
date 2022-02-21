const res = require("express/lib/response");
const sql = require("../database/config");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");


Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orden SET ?", newOrder, (err1, res1) => {
    if (err1) {
      console.log("error: ", err1);
      result(err1, null);
      return;
    }
    console.log("Se creo orden: ", { idOrden: res1.insertId, ...newOrder });
    result(null, { idOrden: res1.insertId, ...newOrder });
    
    // return res.insertId;
  });
  
};

Order.createDetail = (newDetalle, result) => {
  sql.query("INSERT INTO orden SET ?", newDetalle, (err1, res1) => {
    if (err1) {
      console.log("error: ", err1);
      result(err1, null);
      return;
    }

    console.log("created order detail: ", {
      idOrden: res1.insertId,
      ...newDetalle
    });
    result(null, {idOrden: res1.insertId,  ...newDetalle });

    sql.query("INSERT INTO detalleOrden SET idOrden=? ", res1.insertId, (err2, res2) => {
      if (err2) {
        console.log("error: ", err2);
        result(err2, null);
        return;
      }
  
      console.log("created order detail: ", {
        idDetalleOrden: res2.insertId
      });

      sql.query("INSERT INTO _DetalleOrdenToProducto SET idDetalleOrden=?", res2.insertId, (err3, res3) => {
        if (err3) {
          console.log("error: ", err3);
          result(err3, null);
          return;
        }
    
        console.log("created order detail: ", {
          idOrdenProducto: res3.insertId
        });
        // result(null, {idOrdenProducto: res.insertId});
      });
    });
  }); 
};


  // console.log(data);
  // sql.query("INSERT INTO detalleOrden SET ?", newDetalle, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }

  //   console.log("created order detail: ", {
  //     idDetalleOrden: res.insertId,
  //     idOrden: idOrden,
  //     ...newDetalle,
  //   });
  //   result(null, {idDetalleOrden: res.insertId,  ...newDetalle });
  // });
  // Order.createDetail = (newDetalle, result) => {
    // sql.query("INSERT INTO detalleOrden SET ?", newDetalle, (err, res) => {
    //   if (err) {
    //     console.log("error: ", err);
    //     result(err, null);
    //     return;
    //   }
  
    //   console.log("created order detail: ", {
    //     idDetalleOrden: res.insertId,
    //     ...newDetalle,
    //   });
    //   result(null, {idDetalleOrden: res.insertId,  ...newDetalle });
    // });
  // };

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
