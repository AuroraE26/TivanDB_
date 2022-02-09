const sql = require("../database/config");

const Producto = function(producto) {
  this.no_comun = producto.no_comun;
  this.no_clave = producto.no_clave;
  this.nu_cantidad = producto.nu_cantidad;
  this.nu_precio = producto.nu_precio;
  this.nu_cantMin = producto.nu_cantMin;
  this.tx_description = producto.tx_description;
  this.nu_codigoBarras = producto.nu_codigoBarras;
  this.fl_favorito = producto.fl_favorito;
  this.fl_delete = producto.fl_delete;
  this.no_user_creacion = producto.no_user_creacion;
  this.fe_creacion = producto.fe_creacion;
  this.fe_modificacion = producto.fe_modificacion;
};

Producto.create = (newProduct, result) => {
  sql.query("INSERT INTO productos SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Se creo el producto: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Producto.findById = (id, result) => {
  sql.query(`SELECT * FROM productos WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Se encontró el producto: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the id
    result({ kind: "No se pudo encontrar" }, null);
  });
};

Producto.getAll = (result) => {
  let query = "SELECT * FROM productos";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Productos: ", res);
    result(null, res);
  });
};

Producto.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE productos SET no_comun = ?, no_clave = ?, nu_cantidad = ?, nu_precio = ?, nu_cantMin = ?, tx_description = ?, nu_codigoBarras = ?, fl_favorito = ?, fl_delete = ?, no_user_creacion = ?, fe_creacion = ?, fe_modificacion = ? WHERE id = ?"
    [producto.no_comun, producto.no_clave, producto.nu_cantidad, producto.nu_precio, producto.nu_cantMin, producto.tx_description, producto.nu_codigoBarras, producto.fl_favorito, producto.fl_delete, producto.no_user_creacion, producto.fe_creacion, producto.fe_modificacion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "No se pudo encontrar" }, null);
        return;
      }

      console.log("Se actualizo el producto: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Producto.remove = (id, result) => {
  sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found product with the id
      result({ kind: "No se pudo encontrar" }, null);
      return;
    }

    console.log("Se eliminó el producto con número de id: ", id);
    result(null, res);
  });
};

module.exports = Producto;