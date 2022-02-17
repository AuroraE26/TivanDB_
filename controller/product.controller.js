const Producto = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Product
  const producto = new Producto({
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
    fechaCreacion: req.body.fechaCreacion,
    fechaModificacion: req.body.fechaModificacion,
  });

  // Save Product in the database
  Producto.create(producto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product.",
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  Producto.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        code: 500,
        name_code: "Internal Server Error",
        mensaje: err.mensaje || "No se obtuvieron los productos.",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// Find a single Product with a id
exports.findOne = (req, res) => {
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Product identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Producto.updateById(req.params.id, new Producto(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Product with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  Producto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.id,
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};
// };

exports.logicDelete = (req, res) => {
  // // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  Producto.logicDelete(req.params.id, req.body, (err, data) => {
    console.log("revisar", req.body);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error delete Products with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
