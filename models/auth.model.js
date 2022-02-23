const Authentication = function (product) {
  this.id = product.id;
  this.email = product.email;
  this.password = product.password;
};

module.exports = Authentication;
