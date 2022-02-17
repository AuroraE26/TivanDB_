const DetalleOrden = require("../usercase/detalleOrden.case");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacio!",
    });
  }

  const detalleOrden = new DetalleOrden({
    idOrden: req.body.idOrden,
    cantidadPorducto: req.body.cantidadPorducto,
    costoTotalProducto: req.body.costoTotalProducto,

    fechaCreacion: req.body.fechaCreacion,
  });

  DetalleOrden.create(detalleOrden, (err, data) => {
    if (err)
      res.status(500).send({
        code: 500,
        message: err.message || "Error al dar de alta el detalle de orden.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  DetalleOrden.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        code: 500,
        message: err.message || "No se obtuvieron los detalles de orden.",
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  DetalleOrden.findById(req.params.idDetalleOrden, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se pudo obtener el detalle de orden con el id:  ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "No se pudo obtener el detalle de orden con el id: " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacío.",
    });
  }
  console.log(req.body);

  DetalleOrden.updateById(
    req.params.id,
    new DetalleOrden(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Error al editar la información del detalle de orden con id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error al editar la información del detalle de orden con id " +
              req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};
