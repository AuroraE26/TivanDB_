const sql = require("../database/config");

const Producto = function (producto) {
  this.comun = producto.comun;
  this.clave = producto.clave;
  this.cantidad = producto.cantidad;
  this.precio = producto.precio;
  this.cantidadMinima = producto.cantidadMinima;
  this.descripcion = producto.descripcion;
  this.codigoBarras = producto.codigoBarras;
  this.favorito = producto.favorito;
  this.eliminar = producto.eliminar;
  this.userCreacion = producto.userCreacion;
  this.fechaCreacion = producto.fechaCreacion;
  this.fechaModificacion = producto.fechaModificacion;
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
  sql.query(`SELECT * FROM productos WHERE idProducto = ${id}`, (err, res) => {
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
    "UPDATE productos SET comun = ?, clave = ?, cantidad = ?, precio = ?, cantidadMinima = ?, descripcion = ?, codigoBarras = ?, favorito = ?, eliminar = ?, userCreacion = ?, fechaCreacion = ?, fechaModificacion = ? WHERE id = ?"[
      (producto.comun,
      producto.clave,
      producto.cantidad,
      producto.precio,
      producto.cantidadMinima,
      producto.descripcion,
      producto.codigoBarras,
      producto.favorito,
      producto.eliminar,
      producto.userCreacion,
      producto.fechaCreacion,
      producto.fechaModificacion,
      id)
    ],
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

Producto.logicDelete = (id, producto, result) => {
  console.log("model", producto.eliminar);
  sql.query(
    `UPDATE productos SET eliminar = ${producto.eliminar} WHERE idProducto = ${id}`,
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

module.exports = Producto;
