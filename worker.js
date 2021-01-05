/* global d3, importScripts, postMessage */

importScripts('https://d3js.org/d3-force.v2.min.js')
importScripts('https://d3js.org/d3-timer.v2.min.js')
importScripts('https://d3js.org/d3-dispatch.v2.min.js')
importScripts('https://d3js.org/d3-quadtree.v2.min.js')

this.onmessage = function (event) {
  var nodes = event.data.nodes
  var links = event.data.links

  var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody()
      .distanceMin(50))
    .force('link', d3.forceLink(links)
      .distance(25)
      .strength(function (d) {
        return Math.min(1, d.connections * 10.2)
      })
      .id((d) => d.id))
    .force('collision', d3.forceCollide(10)
      .radius(function (d) {
        return d.radius + 20
      }))
    .force('center', d3.forceCenter(0, 0))
    .stop()

  for (var i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
    simulation.tick()
  }

  postMessage({
    nodes: nodes,
    links: links
  })
}
