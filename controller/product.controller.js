const Product = require("../models/product.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacio!"
    });
  }

  const product = new Product({
    comun: req.body.comun,
    clave: req.body.clave,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    cantidadMinima: req.body.cantidadMinima,
    descripcion: req.body.descripcion,
    codigoBarras: req.body.codigoBarras,
    favorito: req.body.favorito,
    eliminar: req.body.eliminar,
    userCreacion: req.body.userCreacion,
    fechaCreacion: req.body.fe_creacion,
    fechaModificacion: req.body.fechaModificacion
  });

  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        code:500,
        message:
          err.message || "Error al dar de alta el producto."
      });
    else res.send(data);
  });
};

// Obtienes todos los productos
exports.findAll = (req,res) => {
  Product.getAll ((err, data) => {
    if (err){
      res.status(500).send({
        code: 500,
        message:
          err.message || "No se obtuvieron los productos."
      })}
    else res.send(data);
    });
  };
  
exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se pudo obtener el producto con el id:  ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "No se pudo obtener el producto con el id: " + req.params.id
            });
          }
        } else res.send(data);
      });
};


// Actualiza el producto por el id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacío."
    });
  }
  console.log(req.body);

  Product.updateById(
    req.params.id,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Error al editar la información del producto con id ${req.params.idProducto}.`
          });
        } else {
          res.status(500).send({
            message: "Error al editar la información del producto con id " + req.params.idProducto
          });
        }
      } else res.send(data);
    }
  );
};

