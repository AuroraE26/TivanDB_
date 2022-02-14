const Sale = require("../models/sales.model.js");

//Crea y guarda una nueva orden
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacio!"
    });
  }

  const sale = new Sale({
    estado: req.body.estado,
    costoTotal: req.body.costoTotal,
    usuarioCreacion: req.body.usuarioCreacion,
    fechaCreacion: req.body.fechaCreacion,
    fechaModificacion: req.body.fechaModificacion
  });

  Sale.create(sale, (err, data) => {
    if (err)
      res.status(500).send({
        code:500,
        message:
          err.message || "Error al dar de alta la orden."
      });
    else res.send(data);
  });
};


// Obtienes todos las ordenes
exports.findAll = (req,res) => {
    Sale.getAll ((err, data) => {
      if (err){
        res.status(500).send({
          code: 500,
          message:
            err.message || "No se obtuvieron las ordenes."
        })}
      else res.send(data);
      });
    };

// Encuentra la orden por id
exports.findOne = (req, res) => {
    Sale.findById(req.params.idOrden, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se pudo obtener la orden con el id:  ${req.params.idOrden}.`
            });
          } else {
            res.status(500).send({
              message: "No se pudo obtener la orden con el id: " + req.params.idOrden
            });
          }
        } else res.send(data);
      });
};


// Actualiza el producto por el id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "No puede estar vacío."
      });
    }
    console.log(req.body);
  
    Sale.updateById(
      req.params.idOrden,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Error al editar la información de la orden con id ${req.params.idOrden}.`
            });
          } else {
            res.status(500).send({
              message: "Error al editar la información de la orden con id " + req.params.idOrden
            });
          }
        } else res.send(data);
      }
    );
  };