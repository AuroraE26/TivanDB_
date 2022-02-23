const Order = require("../usercase/order.case");
const OrderDetail = require("../usercase/orderDetail.case");
const Product = require("../usercase/product.case");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacio!",
    });
  }

  const order = new Order({
    estadoOrden: req.body.estadoOrden,
    costoTotal: req.body.costoTotal,
    usuarioCreacion: req.body.usuarioCreacion,
    fechaCreacion: req.body.fechaCreacion,
    fechaModificacion: req.body.fechaModificacion,
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

exports.createDetailedOrder =  async (req, res) => {
  const order = new Order({
    estadoOrden: req.body.estadoOrden,
    costoTotal: req.body.costoTotal,
    usuarioCreacion: req.body.usuarioCreacion,
    fechaCreacion: req.body.fechaCreacion,
    fechaModificacion: req.body.fechaModificacion,
  });

  const products = new OrderDetail({
    products: req.body.products,
  });
  const data2 = [];
  Order.createDetail(order, (err, data) => {
    if (err)
      res.status(500).send({
        code: 500,
        message: err.message || "Error al dar de alta la orden.",
      });
      res.send(data);
  });
  for (let i = 0; i < req.body.products.length; i++) {
    Order.createDetailedOrder(req.body.products[i], (err, data2) => {
      if (err)
        res.status(500).send({
          code: 500,
          message: err.message || "Error al dar de alta la orden.",
        });
    });
    const productQuantity = await Product.findProductSupplyById(
      req.body.products[i].id
    );
    let newAmount = productQuantity - req.body.products[i].cantidadProducto;
    const result = await Product.updateProductQuantity(
      req.body.products[i].id,
      newAmount
    );
    data2.push(result);
  }
};
exports.findOneDetailed = (req, res) => {
  Order.findByIdDetailed(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se pudo obtener la orden con el id:  ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo obtener la orden con el id: " + req.params.id,
        });
      }
    }

    var newData = [];
    for (let i = 0; i < data.idOrden.length; i++) {
      Order.findByIdProductDet(data.idOrden[i], (err, data2) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `No se pudo obtener la orden con el id:  ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              message:
                "No se pudo obtener la orden con el id: " + req.params.id,
            });
          }
        }
        newData.push(data2.Producto[0]);
        //En el último elemento se realiza un send para mandar todos los datos.
        if (i === data.idOrden.length - 1) {
          res.send({ Orden: data.Orden, Producto: newData });
        }
      });
    }
  });
};

exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        code: 500,
        message: err.message || "No se obtuvieron las ordenes.",
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Order.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se pudo obtener la orden con el id:  ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "No se pudo obtener la orden con el id: " + req.params.id,
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
  Order.updateById(req.params.id, new Order(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Error al editar la información de la orden con id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error al editar la información de la orden con id " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.logicDelete = (req, res) => {
  // // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  Order.logicDelete(req.params.id, req.body, (err, data) => {
    console.log("revisar", req.body);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product`,
        });
      } else {
        res.status(500).send({
          message: "Error delete Products",
        });
      }
    } else res.send(data);
  });
};
