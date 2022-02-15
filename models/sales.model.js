const sql = require("../database/config");

const Sale = function(sale) {
  this.estadoOrden = sale.estadoOrden;
  this.costoTotal = sale.costoTotal;
  this.usuarioCreacion = sale.usuarioCreacion;
  this.fechaCreacion = sale.fechaCreacion;
  this.fechaModificacion = sale.fechaModificacion;
};

Sale.create = (newSale, result) => {
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

  Sale.findById = (idOrden, result) => {
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

  Sale.getAll = (result) => {
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

  Sale.updateById = (idOrden, sale, result) => {
    sql.query(
      "UPDATE orden SET estadoOrden = ?, costoTotal = ?, usuarioCreacion = ?, fechaCreacion = ?, fechaModificacion = ? WHERE idOrden = ?",
      [sale.estadoOrden, sale.costoTotal, sale.usuarioCreacion, sale.fechaCreacion, sale.fechaModificacion, idOrden],
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


  module.exports = Sale;
