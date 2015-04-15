var assert = require('assert');
var fs = require('fs');
var Parser = require("htmlparser2").Parser;
var Handler = require("../lib/");
var path = require('path');

var xmlFilePath = path.resolve(__dirname, './fixture/ns-xml.xml');
var xmlContent = fs.readFileSync(xmlFilePath, {encoding: 'utf8'});

function getElement(nodeList) {
  for(var i = 0; i < nodeList.length; ++i) {
    var node = nodeList[i];
    if(node.type === 'tag')
      return node;
  }
}

describe('xml namespace', function() {
  var document = null;
  beforeEach(function(done) {
    var handler = new Handler(function(err, doc){
      if(err) done(err);
      document = doc;
      done();
    });
    var parser = new Parser(handler);

    parser.write(xmlContent);
    parser.done();
  });

  it('parse the xml document', function() {
    var namespaces = document.namespaces;
    namespaces.forEach(function(ns) {
      var nsList = ['namespace1', 'namespace2', 'namespace-default'];
      assert.ok(nsList.indexOf(ns.href) != -1);
    });
    var dom = document.dom;
    var root = getElement(dom);
    assert.ok(!root.defaultNS && !root.ns && !root.attribs['xmlns:ns1']);

    var node1 = getElement(root.children);
    assert.ok(!node1.defaultNS);
    assert.equal(node1.ns.href, 'namespace1');
    assert.equal(node1.doc, document);

    var node2 = getElement(node1.children);
    assert.ok(!node2.defaultNS);
    assert.equal(node2.ns.href, 'namespace2');

    var node3 = getElement(node2.children);
    assert.equal(node3.ns.href, 'namespace2');

    var node4 = getElement(node3.children);
    assert.ok(!node4.attribs['xmlns']);
    assert.equal(node4.defaultNS.href, 'namespace-default');
    assert.equal(node4.ns.href, 'namespace-default');

    var node5 = getElement(node4.children);
    assert.equal(node5.defaultNS.href, 'namespace-default');
    assert.equal(node5.ns.href, 'namespace-default');

    var node6 = getElement(node5.children);
    assert.equal(node6.defaultNS.href, 'namespace-default');
    assert.equal(node6.ns.href, 'namespace1');
  });
});
