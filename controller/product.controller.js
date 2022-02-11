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
            message: `Error al editar la información del producto con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al editar la información del producto con id " + req.params.id
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
              message: `Np se encuentra el produclto con e id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Np se encuentra el produclto con eid " + req.params.id
            });
          }
        } else res.send({ message: `El producto fue eliminado exitosamente!` });
      });
};
