<template>
  <div class="container" ref="container">
    <svg ref="svg" xmlns="http://www.w3.org/2000/svg"
      @click="click"
      :width="containerSize[0]+'px'" :height="containerSize[1]+'px'"
      :viewBox="[-containerSize[0] / 2, -containerSize[1] / 2, containerSize[0], containerSize[1]].join(' ')">
      <g v-if="bounds.minX" :transform="transform">
        <g v-for="(node, index) in graph.nodes" :key="node.id"
          @mouseover="nodeMouseOver(node.id)" @mouseout="nodeMouseOut(node.id)"
          :style="{
            transform: `translate(${coords[index].x}px, ${coords[index].y}px)`
          }">
          <circle :r="node.radius + circlePadding" cx="0" cy="0"
            :class="{
              selected: nodeIdHovering === node.id || (selected && selected.includes(node.id)),
              connected: connectedNodes.includes(node.id)
            }" />
          <router-link :to="{name: $route.name, query: {
            hashtags: node.id.slice(1)
          }}" :style="{
            transform: `translate(0, 2px)`
          }">
            <text alignment-baseline="middle" text-anchor="middle">
              {{ node.id }}
              <tspan>[{{ node.messages }}]</tspan>
            </text>
          </router-link>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { zoom } from 'd3-zoom'
import { select, event } from 'd3-selection'

import { groupBy } from 'ramda'

export default {
  props: {
    hashtags: Array,
    selected: Array
  },
  components: {

  },
  data: function () {
    return {
      graph: {
        nodes: [],
        links: []
      },
      circlePadding: 5,
      nodeIdHovering: undefined,
      containerSize: [0, 0],
      graphSize: [900, 900],
      transform: null,
      zoom: null,
      worker: new Worker('worker.js')
    }
  },
  mounted: function () {
    this.graph = this.createGraph(this.hashtags)

    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    this.createForceLayout()

    select(this.$refs.svg).call(this.zoom)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    connectedNodes: function () {
      const selected = (this.nodeIdHovering && [this.nodeIdHovering])
        || this.selected

      if (selected && this.graph && this.graph.links) {
        return this.graph.links.filter((link) => {
          return selected.includes(link.source.id) || selected.includes(link.target.id)
        })
          .map((link) => ([link.source.id, link.target.id]))
          .flat()
      }

      return []
    },
    bounds: function () {
      return {
        minX: Math.min(...this.graph.nodes.map((n) => n.x)),
        maxX: Math.max(...this.graph.nodes.map((n) => n.x)),
        minY: Math.min(...this.graph.nodes.map((n) => n.y)),
        maxY: Math.max(...this.graph.nodes.map((n) => n.y))
      }
    },
    coords: function () {
      return this.graph.nodes.map((node) => {
        return {
          x: node.x,
          y: node.y
        }
      })
    }
  },
  methods: {
    unitVector: function (p1, p2) {
      const x = p2.x - p1.x
      const y = p2.y - p1.y
      const magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

      return {
        x: x / magnitude,
        y: y / magnitude
      }
    },
    nodeMouseOver: function (nodeId) {
      this.nodeIdHovering = nodeId
    },
    nodeMouseOut: function () {
      this.nodeIdHovering = undefined
    },
    click: function (event) {
      if (event.target !== this.$refs.svg) {
        return
      }

      if (this.$route.query.hashtags) {
        this.$router.push({
          name: this.$route.name,
        })
      }
    },
    createForceLayout: function () {
      this.worker.onmessage = (event) => {
        this.graph = event.data
      }

      this.worker.postMessage({
        links: this.graph.links,
        nodes: this.graph.nodes
      })
    },
    handleResize: function () {
      this.containerSize = [
        this.$refs.container.clientWidth,
        this.$refs.container.clientHeight
      ]

      if (!this.zoom) {
        this.zoom = zoom()
          .scaleExtent([0.75, 2.5])
          .on('zoom', () => {
            this.transform = event.transform
          })
      }

      this.zoom
        .translateExtent([
          [-this.containerSize[0] - 500, -this.containerSize[1] - 500],
          [this.containerSize[0] + 500, this.containerSize[1] + 500]
        ])
    },
    links: function (hashtags) {
      const pairs = Object.values(this.hashtagsByMessage(hashtags))
        .filter((messages) => messages.length > 1)
        .map((messages) => {
            return this.toPairs(messages)
              .map(([source, target]) => ({
                source,
                target,
                messages: messages.length
              }))
          }).flat()

      const bySourceTarget = groupBy((pair) => {
        const source = pair.source < pair.target ? pair.source : pair.target
        const target = pair.source >= pair.target ? pair.source : pair.target
        return `${source}-${target}`
      })

      const grouped = bySourceTarget(pairs)

      return Object.entries(grouped)
        .map(([id, links]) => ({
          id,
          source: links[0].source,
          target: links[0].target,
          messages: links.reduce((acc, cur) => acc + cur.messages, 0),
          connections: links.length
        }))
    },
    createGraph: function (hashtags) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.font = '16px "Helvetica Neue"'
      const radius = (str) => ctx.measureText(str).width / 2 + 5

      return {
        nodes: hashtags.map((hashtag) => ({
          id: hashtag.hashtag,
          x: null, y: null,
          messages: hashtag.messages.length,
          radius: radius(`${hashtag.hashtag} [${hashtag.messages.length}]`)
        })),
        links: this.links(hashtags)
      }
    },
    hashtagsByMessage: function (hashtags) {
      const hashtagsByMessage = {}
      hashtags.forEach((hashtag) => {
        hashtag.messages.forEach((message) => {
          const messageId = message.reply_to || message.message_id
          if (!hashtagsByMessage[messageId]) {
            hashtagsByMessage[messageId] = []
          }
          hashtagsByMessage[messageId].push(hashtag.hashtag)
        })
      })

      return hashtagsByMessage
    },
    toPairs: function (arr) {
      return arr.reduce((result, value, index, array) => {
        if (index !== 0) {
          result.push(array.slice(index - 1, index + 1))
        }
        return result
      }, [])
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

svg {
  width: 100%;
  height: 100%;
  display: block;
}

svg line {
  stroke-width: 0.2px;
}

svg text {
  user-select: none;
  fill: black;
}

svg text tspan {
  fill: #777;
}

svg circle {
  stroke-width: 0;
  fill: rgb(230, 230, 230);
  stroke: rgb(230, 230, 230);
  transition: stroke-width 0.2s ease;
}

svg circle.connected {
  stroke: #888;
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

svg circle.selected {
  stroke: black;
  stroke-width: 1;
  stroke-dasharray: none;
}
</style>
