const Authentication = function (product) {
  this.id = product.id;
  this.nombre = product.nombre;
  this.email = product.email;
  this.password = product.password;
};

module.exports = Authentication;
