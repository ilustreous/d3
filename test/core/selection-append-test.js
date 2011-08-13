require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.append");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "appends an HTML element": function(body) {
      var div = body.append("div");
      assert.equal(div[0][0].tagName, "DIV");
      assert.isNull(div[0][0].namespaceURI);
      assert.isTrue(div[0][0].parentNode === document.body);
      assert.isTrue(div[0][0] === document.body.lastChild);
    },
    "appends an SVG element": function(body) {
      var svg = body.append("svg:svg");
      assert.equal(svg[0][0].tagName, "SVG");
      assert.equal(svg[0][0].namespaceURI, "http://www.w3.org/2000/svg");
      assert.isTrue(svg[0][0].parentNode === document.body);
      assert.isTrue(svg[0][0] === document.body.lastChild);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "appends an HTML element": function(div) {
      var span = div.append("span");
      assert.equal(span[0].length, 2);
      assert.equal(span[0][0].tagName, "SPAN");
      assert.equal(span[0][1].tagName, "SPAN");
      assert.isNull(span[0][0].namespaceURI);
      assert.isNull(span[0][1].namespaceURI);
      assert.isTrue(span[0][0].parentNode === div[0][0]);
      assert.isTrue(span[0][1].parentNode === div[0][1]);
      assert.isTrue(div[0][0].lastChild === span[0][0]);
      assert.isTrue(div[0][1].lastChild === span[0][1]);
    },
    "appends an SVG element": function(div) {
      var svg = div.append("svg:svg");
      assert.equal(svg[0].length, 2);
      assert.equal(svg[0][0].tagName, "SVG");
      assert.equal(svg[0][1].tagName, "SVG");
      assert.equal(svg[0][0].namespaceURI, "http://www.w3.org/2000/svg");
      assert.equal(svg[0][1].namespaceURI, "http://www.w3.org/2000/svg");
      assert.isTrue(svg[0][0].parentNode === div[0][0]);
      assert.isTrue(svg[0][1].parentNode === div[0][1]);
      assert.isTrue(div[0][0].lastChild === svg[0][0]);
      assert.isTrue(div[0][1].lastChild === svg[0][1]);
    },
    "ignores null nodes": function(div) {
      div.html("");
      var some = d3.selectAll("div");
      some[0][1] = null;
      var span = some.append("span");
      assert.equal(span[0].length, 2);
      assert.equal(span[0][0].tagName, "SPAN");
      assert.isNull(span[0][1]);
      assert.isTrue(span[0][0].parentNode === div[0][0]);
      assert.isTrue(div[0][0].lastChild === span[0][0]);
      assert.isNull(div[0][1].lastChild);
    }
  }
});

suite.export(module);