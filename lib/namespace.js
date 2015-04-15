
function Namespace(prefix, href) {
  if(prefix)
    this.prefix = prefix;
  this.href = href;
}

function Namespaces() {
  this.nsList = [];
  this.nsMap = {};
}

Namespaces.prototype.addNS = function(prefix, href) {
  if(href == null) {
    href = prefix;
    prefix = null;
  }
  var ns = new Namespace(prefix, href);
  this.nsList.push(ns);
  if(prefix) this.nsMap[prefix] = ns;
  return ns;
};

Namespaces.prototype.getNS = function(prefix) {
  return this.nsMap[prefix];
};

Namespaces.prototype.forEach = function(callback) {
  this.nsList.forEach(callback);
};
module.exports = Namespaces;
