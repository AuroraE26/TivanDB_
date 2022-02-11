const Product = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
  const product = new Product({
    no_comun: req.body.no_comun,
    no_clave: req.body.no_clave,
    nu_cantidad: req.body.nu_cantidad,
    nu_precio: req.body.nu_precio,
    nu_cantMin: req.body.nu_cantMin,
    tx_description: req.body.tx_description,
    nu_codigoBarras: req.body.nu_codigoBarras,
    fl_favorito: req.body.fl_favorito,
    fl_delete: req.body.fl_delete,
    no_user_creacion: req.body.no_user_creacion,
    fe_creacion: req.body.fe_creacion,
    fe_modificacion: req.body.fe_modificacion
  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.findAll = (req,res) => {
  Product.getAll ((err, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      })}
    else res.send(data);
    });
  };
  

// Find a single Product with a id
exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found product with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving product with id " + req.params.id
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
      message: "Content can not be empty!"
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
            message: `Not found Product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
    Product.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Product with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Product with id " + req.params.id
            });
          }
        } else res.send({ message: `Product was deleted successfully!` });
      });
};
