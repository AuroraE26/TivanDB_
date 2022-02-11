const sql = require("../database/config");

const Sale = function(sale) {
  this.idOrden = sale.idOrden;
  this.estado = sale.estado;
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
      console.log("Se creo orden: ", { id: res.insertId, ...newSale });
      result(null, { id: res.insertId, ...newSale });
    });
  };

  Sale.findById = (id, result) => {
    sql.query(`SELECT * FROM orden WHERE id = ${id}`, (err, res) => {
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
      // not found product with the id
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

  Sale.updateById = (id, sale, result) => {
    sql.query(
      "UPDATE orden SET idOrden = ?, estado = ?, costoTotal = ?, usuarioCreacion = ?, fechaCreacion = ?, fechaModificacion = ? WHERE id = ?",
      [sale.idOrden, sale.estado, sale.costoTotal, sale.usuarioCreacion, sale.fechaCreacion, sale.fechaModificacion, id],
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
  
        console.log("Se actualizó la orden: ", { id: id, ...sale });
        result(null, { id: id, ...sale });
      }
    );
  };


  module.exports = Sale;
