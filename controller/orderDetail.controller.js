const Order = require("../usercase/orderDetail.case");


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacio!",
    });
  }

  const order = new Order({
    idOrden: req.body.idOrden,
    cantidadProducto: req.body.cantidadProducto,
    costoTotalProducto: req.body.costoTotalProducto,
    fechaCreacion: req.body.fechaCreacion
  });

  Order.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        code: 500,
        message: err.message || "Error al dar de alta la orden.",
      });
    else res.send(data);
  });
};



exports.findAll = (req,res) => {
  Order.getAll ((err, data) => {
      if (err){
        res.status(500).send({
          code: 500,
          message:
            err.message || "No se obtuvieron las ordenes."
        })}
      else res.send(data);
      });
    };

exports.findOne = (req, res) => {
  Order.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se pudo obtener la orden con el id:  ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "No se pudo obtener la orden con el id: " + req.params.id
            });
          }
        } else res.send(data);
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacío."
    });
  }
  console.log(req.body);
  Order.updateById(
    req.params.id,
    new Order(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Error al editar la información de la orden con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al editar la información de la orden con id " + req.params.id
          });
        }
      } else res.send(data);
})
}