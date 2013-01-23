/**
A reusable module to format return data from a salt command as a tree using d3
**/
define(function(require) {
    'use strict';

    var d3 = require('d3');

    /**
    Convert
        {key: {key: val, key: val}}
        to
        {name: key, children: [{name: key, val: val}, {name: key, val: val}]}
    **/
    function fmt(obj) {
        if (!obj) return;

        return Object.keys(obj).map(function(key) {
            var iobj = {name: key};

            switch (typeof(obj[key])) {
                case 'object':
                    iobj.children = fmt(obj[key]);
                    break;
                default:
                    iobj.val = obj[key];
            }

            return iobj;
        });
    }

function update(source, domelem) {
    var w = 960,
        h = 8000,
        i = 0,
        barHeight = 20,
        barWidth = w * .8,
        duration = 400,
        root;

    root = {
        name: 'results',
        children: d3.nest().entries(fmt(source)),
        x0: 0,
        y0: 0,
    };

    var tree = d3.layout.tree()
        .size([h, 100]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; });

    var vis = d3.select(domelem).append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        .attr("transform", "translate(20,30)");

  // Compute the flattened node list. TODO use d3.layout.hierarchy.
  var nodes = tree.nodes(root);

  // Compute the "layout".
  nodes.forEach(function(n, i) {
    n.x = i * barHeight;
  });

  // Update the nodes…
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .style("opacity", 1e-6);

  // Enter any new nodes at the parent's previous position.
  nodeEnter.append("svg:rect")
      .attr("y", -barHeight / 2)
      .attr("height", barHeight)
      .attr("width", barWidth)
      .style("fill", color)
      .on("click", click);

  nodeEnter.append("svg:text")
      .attr("dy", 3.5)
      .attr("dx", 5.5)
      .text(function(d) {
          if (d.val) {
              return d.name + ": " + d.val;
          }
          return d.name;
      });

  // Transition nodes to their new position.
  nodeEnter.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1);

  node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      .style("opacity", 1)
      .select("rect")
      .style("fill", color);

  // Transition exiting nodes to the parent's new position.
  node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .style("opacity", 1e-6)
      .remove();

  // Update the links…
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

function color(d) {
  if (d.name == 'result') {
      if (d.val == false) {
          return '#9d261d';
      }
  }
  if (d.name == 'changes') {
      if (d.children.length > 0) {
          return '#46a546';
      }
  }
  return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
}


    return update;
});
