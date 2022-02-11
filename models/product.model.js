const sql = require("../database/config");

const Product = function(product) {
  this.no_comun = product.no_comun;
  this.no_clave = product.no_clave;
  this.nu_cantidad = product.nu_cantidad;
  this.nu_precio = product.nu_precio;
  this.nu_cantMin = product.nu_cantMin;
  this.tx_description = product.tx_description;
  this.nu_codigoBarras = product.nu_codigoBarras;
  this.fl_favorito = product.fl_favorito;
  this.fl_delete = product.fl_delete;
  this.no_user_creacion = product.no_user_creacion;
  this.fe_creacion = product.fe_creacion;
  this.fe_modificacion = product.fe_modificacion;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO productos SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM productos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (result) => {
  let query = "SELECT * FROM productos";
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

Product.updateById = (id, product, result) => {
  sql.query(
    "UPDATE productos SET no_comun = ?, no_clave = ?, nu_cantMin = ?, nu_precio = ?, no_comun = ? WHERE id = ?",
    [product.no_comun, product.no_clave, product.nu_cantMin, product.nu_precio, product.no_comun, id],
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

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
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

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

module.exports = Product;