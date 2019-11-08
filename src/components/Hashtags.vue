<template>
  <svg ref="svg" xmlns="http://www.w3.org/2000/svg" :width="width+'px'" :height="height+'px'">
    <g v-if="bounds.minX">
      <line v-for="link in graph.links"
        :x1="coords[link.source.index].x" :y1="coords[link.source.index].y"
        :x2="coords[link.target.index].x" :y2="coords[link.target.index].y"
        stroke="black" stroke-width="2"/>
      <g v-for="(node, index) in graph.nodes" :key="index"
        :style="{
          transform: `translate(${coords[index].x}px, ${coords[index].y}px)`
        }">
        <router-link :to="{name: $route.name, query: {
            hashtags: node.id.slice(1)
        }}">
          <text>{{ node.id }}</text>
        </router-link>
        <!-- <circle :r="node.radius" cx="0" cy="0" stroke="white" stroke-width="1" /> -->
      </g>
    </g>
  </svg>
</template>

<script>
import { forceSimulation,  //forceManyBody, forceCollide, forceCenter,
  forceLink, forceX, forceY } from 'd3-force'

export default {
  props: {
    hashtags: Array
  },
  components: {

  },
  data: function () {
    return {
      graph: {
        nodes: [],
        links: []
      },
      padding: 20,
      width: 0,
      height: 0,
      simulation: null,
    }
  },
  mounted: function () {
    this.width = this.$refs.svg.clientWidth
    this.height = this.$refs.svg.clientHeight

    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  created: function () {
    this.graph = this.createGraph(this.hashtags)

    this.simulation = forceSimulation(this.graph.nodes)
      // .force('charge', forceManyBody().strength((d) => -5))
      // .force('collide', forceCollide(1).radius((d) => d.radius * 10 + 0.5))
      .force('link', forceLink(this.graph.links).id((d) => d.id))
      .force('x', forceX())
      .force('y', forceY())
  },
  watch: {
    hashtags: function (hashtags) {
      this.graph = this.createGraph(hashtags)
      this.simulation.alpha(1)
      this.simulation.restart()
    }
  },
  computed: {
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
          x: this.padding + (node.x - this.bounds.minX) * (this.width - 2 * this.padding) / (this.bounds.maxX - this.bounds.minX),
          y: this.padding + (node.y - this.bounds.minY) * (this.height - 2 * this.padding) / (this.bounds.maxY - this.bounds.minY)
        }
      })
    }
  },
  methods: {
    handleResize: function () {
      this.width = this.$refs.svg.clientWidth
      this.height = this.$refs.svg.clientHeight

      this.simulation.alpha(1)
      this.simulation.restart()
    },
    createGraph: function (hashtags) {
      return {
        nodes: hashtags.map((hashtag) => ({
          id: hashtag.hashtag,
          x: null, y: null,
          radius: hashtag.hashtag.length * 1
        })),
        links: Object.values(this.hashtagsByMessage(hashtags))
          .filter((messages) => messages.length > 1)
          .map((messages) => {
            return this.toPairs(messages).map(([source, target]) => ({
              source,
              target,
              messages: messages.length
            }))
        }).flat()
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
svg line {
  stroke-width: 0.1px;
}

svg text {
  user-select: none;
}
</style>
