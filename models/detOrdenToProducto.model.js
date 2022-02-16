const sql = require("../database/config");

const OrderProduct = function(orderProduct) {
    this.idDetalleOrden = orderProduct.idDetalleOrden;
    this.idProducto = orderProduct.idProducto;
};

OrderProduct.create = (newOrderProduct, result) => {
    sql.query("INSERT INTO _DetalleOrdenToProducto SET ?", newOrderProduct, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created order to product: ", { idOrdenProducto: res.insertId, ...newOrderProduct });
      result(null, { idOrdenProducto: res.insertId, ...newOrderProduct });
    });
};

  
OrderProduct.findById = (idOrdenProducto, result) => {
    sql.query(`SELECT * FROM _DetalleOrdenToProducto WHERE idOrdenProducto = ${idOrdenProducto}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found order to product: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  OrderProduct.getAll = (result) => {
    let query = "SELECT * FROM _DetalleOrdenToProducto";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Orders To products: ", res);
      result(null, res);
    });
  };  

  OrderProduct.updateById = (idOrdenProducto, orderProduct, result) => {
    sql.query(
      "UPDATE _DetalleOrdenToProducto SET idDetalleOrden = ?, idProducto = ? WHERE idOrdenProducto = ?",
      [orderProduct.idDetalleOrden, orderProduct.idProducto, idOrdenProducto],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found product with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Se actualizó el producto: ", { idProducto: idProducto, ...product });
        result(null, { idProducto: idProducto, ...product });
      }
    );
  };
