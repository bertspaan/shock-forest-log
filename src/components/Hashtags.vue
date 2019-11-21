<template>
  <div class="container" ref="container">
    <svg ref="svg" xmlns="http://www.w3.org/2000/svg"
      v-if="width && height"
      @click="click"
      @mousemove="drag($event)" @mouseup="drop()"
      :width="width+'px'" :height="height+'px'">
      <g v-if="bounds.minX">
        <line v-for="(link, index) in graph.links"
          :key="`${link.source.id}-${link.target.id}${index}`"
          :x1="coords[link.source.index].x" :y1="coords[link.source.index].y"
          :x2="coords[link.target.index].x" :y2="coords[link.target.index].y"
          stroke="black" stroke-width="2"/>
        <g v-for="(node, index) in graph.nodes" :key="node.id"
          @mousedown="currentMove = {x: $event.screenX, y: $event.screenY, node: node}"
          :style="{
            transform: `translate(${coords[index].x}px, ${coords[index].y}px)`
          }">
          <router-link :to="{name: $route.name, query: {
            hashtags: node.id.slice(1)
          }}">
            <text text-anchor="middle">{{ node.id }}</text>
          </router-link>
          <!-- <circle :r="node.radius" cx="0" cy="0" stroke="white" stroke-width="1" /> -->
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { forceSimulation,  forceManyBody, forceCollide, forceCenter,
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
      padding: 100,
      width: null,
      height: null,
      simulation: null,
      currentMove: null
    }
  },
  mounted: function () {
    this.width = this.$refs.container.clientWidth
    this.height = this.$refs.container.clientHeight

    window.addEventListener('resize', this.handleResize)
    this.createForceLayout()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    hashtags: function (hashtags) {
      this.graph = this.createGraph(hashtags)
      this.createForceLayout()
      this.restartSimulation()
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
     drag: function (event) {
      if (this.currentMove) {
        this.currentMove.node.fx = this.currentMove.node.x - (this.currentMove.x - event.screenX) * (this.bounds.maxX - this.bounds.minX) / (this.width - 2 * this.padding)
        this.currentMove.node.fy = this.currentMove.node.y - (this.currentMove.y - event.screenY) * (this.bounds.maxY - this.bounds.minY) / (this.height - 2 * this.padding)
        this.currentMove.x = event.screenX
        this.currentMove.y = event.screenY
      }
    },
    drop: function () {
      if (this.currentMove) {
        delete this.currentMove.node.fx
        delete this.currentMove.node.fy
        this.currentMove = null
        this.restartSimulation()
      }
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
      this.padding = Math.min(this.width, this.height) * 0.02

      this.graph = this.createGraph(this.hashtags)

      this.simulation = forceSimulation(this.graph.nodes)
        .alpha(0.02)
        .force('center', forceCenter(this.width / 2, this.height / 2))
        .force('collision', forceCollide(10)
          .radius((d) => {
            return d.radius * 3
          })
        )
        .force('charge', forceManyBody().strength(-50))
        .force('x', forceX(0))
        .force('y', forceY(0))
        // .force('x', forceX(this.width / 2))
        // .force('y', forceY(this.height / 2))
        .force('link', forceLink(this.graph.links).id((d) => d.id)
          .distance(25))
    },
    restartSimulation: function () {
      if (!this.simulation) {
        return
      }

      this.simulation.alpha(.01)
      this.simulation.restart()
    },
    handleResize: function () {
      this.width = this.$refs.svg.clientWidth
      this.height = this.$refs.svg.clientHeight

      this.restartSimulation()
    },
    createGraph: function (hashtags) {
      return {
        nodes: hashtags.map((hashtag) => ({
          id: hashtag.hashtag,
          x: null, y: null,
          radius: hashtag.hashtag.length
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
.container {
  width: 100%;
  height: 100%;
}

svg {
  width: 100%;
  height: 100%;
}

svg line {
  stroke-width: 0.02px;
}

svg text {
  user-select: none;
  font-size: 1.2em;
}
</style>
