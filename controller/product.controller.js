const Product = require("../models/product.model.js");

//Crea y guarda un nuevo producto
exports.create = (req, res) => {
  // Validate request
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
  

// Encuentra el producto por id
exports.findOne = (req, res) => {
    Product.findById(req.params.idProducto, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se pudo obtener el producto con el id:  ${req.params.idProducto}.`
            });
          } else {
            res.status(500).send({
              message: "No se pudo obtener el producto con el id: " + req.params.idProducto
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
    req.params.idProducto,
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

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    Product.remove(req.params.idProducto, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Np se encuentra el produclto con e id ${req.params.idProducto}.`
            });
          } else {
            res.status(500).send({
              message: "Np se encuentra el produclto con eid " + req.params.idProducto
            });
          }
        } else res.send({ message: `El producto fue eliminado exitosamente!` });
      });
};
