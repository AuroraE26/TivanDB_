const sql = require("../database/config");
const Product = require("../models/product.model");

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO productos SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Product: ", {
      idProducto: res.insertId,
      ...newProduct,
    });
    result(null, { idProducto: res.insertId, ...newProduct });
  });
};

Product.findById = (idProducto, result) => {
  sql.query(
    `SELECT * FROM productos WHERE idProducto = ${idProducto}`,
    (err, res) => {
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
    }
  );
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

Product.updateById = (idProducto, product, result) => {
  sql.query(
    "UPDATE productos SET comun = ?, clave = ?, cantidad = ?, precio = ?, cantidadMinima = ?, descripcion = ?, codigoBarras = ?, favorito = ?, eliminar = ?, userCreacion = ?, fechaCreacion = ?, fechaModificacion = ? WHERE idProducto = ?",
    [
      product.comun,
      product.clave,
      product.cantidad,
      product.precio,
      product.cantidadMinima,
      product.descripcion,
      product.codigoBarras,
      product.favorito,
      product.eliminar,
      product.userCreacion,
      product.fechaCreacion,
      product.fechaModificacion,
      idProducto,
    ],
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

      console.log("Se actualizó el producto: ", {
        idProducto: idProducto,
        ...product,
      });
      result(null, { idProducto: idProducto, ...product });
    }
  );
};

module.exports = Product;