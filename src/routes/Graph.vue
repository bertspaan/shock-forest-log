<template>
  <div class="container" ref="container">
    <svg v-if="packed" :width="size[0]" :height="size[1]">
      <g class="edges">
        <g v-for="connection in connections" :key="connection.messageId"
          :class="{
            active: connection.messageId === activeMessageId
          }">
          <path v-for="(edge, index) in connection.edges" :key="index"
          :d="`M${edge[0].x},${edge[0].y}
            Q ${((edge[1].x - edge[0].x) / 2 + edge[0].x) - ((edge[1].x - edge[0].x) * 1.3)}
            ${((edge[1].y - edge[0].y) / 2 + edge[0].y) - ((edge[0].y - edge[1].y) * 1.3)},
            ${edge[1].x},${edge[1].y}`" />
        </g>
      </g>
      <g class="circles">
        <g v-for="circle in circles"
          :key="circle.data.name"
          :class="{
            [circle.data.type]: true,
            active: circle.data.messageId && circle.data.messageId === activeMessageId
          }"
          @mouseover="activeMessageId = circle.data.messageId"
          @mouseleave="activeMessageId = undefined"
          :style="{
            transform: `translate(${circle.x}px, ${circle.y}px)`
          }">
          <router-link
            :to="{name: $route.name, query: {
              messageId: circle.data.messageId,
              hashtag: circle.data.hashtag
            }}">
            <template v-if="circle.data.type === 'hashtag'">
              <circle :r="circle.r" class="border" />
            </template>
            <circle :r="circle.r" :id="`circle-${circle.data.name}`" class="circle" />
            <template v-if="circle.data.type === 'message' && messagesById[circle.data.messageId].files">
              <circle :r="circle.r - 2" :id="`circle-${circle.data.name}-file`" class="file" />
            </template>
          </router-link>
          <template v-if="circle.data.type === 'hashtag'">
            <path :id="`path-${circle.data.name}`" :d="`
              M ${circle.x - circle.r - hashtagSpacing},${circle.y}
              a ${circle.r},${circle.r} 0 0,1
              ${(circle.r + hashtagSpacing) * 2},0`"
              :style="{
                fill: 'none',
                transform: `translate(${-circle.x}px, ${-circle.y}px)`
              }"
            />
            <router-link :to="{name: $route.name, query: {
              messageId: circle.data.messageId,
              hashtag: circle.data.hashtag
            }}">
              <text>
                <textPath :xlink:href="`#path-${circle.data.name}`"
                  startOffset="50%">
                  {{ circle.data.hashtag }}
                </textPath>
              </text>
            </router-link>
          </template>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { hierarchy, pack } from 'd3-hierarchy'
import { groupBy } from 'ramda'

export default {
  name: 'graph',
  components: {
  },
  props: {
    messages: Array,
    hashtags: Array,
    locations: Object,
    messagesById: Object
  },
  data: function () {
    return {
      size: [500, 500],
      packed: undefined,
      hashtagSpacing: 4,
      activeMessageId: undefined
    }
  },
  watch: {
    size: function () {
      this.redraw()
    },
    hashtags: function () {
      this.redraw()
    }
  },
  computed: {
    // svgPatterns: function () {
    //  <defs>
    //   <pattern id="image" x="0%" y="0%" height="100%" width="100%"
    //             viewBox="0 0 512 512">
    //     <image x="0%" y="0%" width="512" height="512" xlink:href="https://cdn3.iconfinder.com/data/icons/people-professions/512/Baby-512.png"></image>
    //   </pattern>
    // </defs>
    // },
    connections: function () {
      return Object.entries(this.circlesByMessageId)
        .filter(([messageId, circles]) => circles.length > 1)
        .map(([messageId, circles]) => ({
          messageId: parseInt(messageId),
          edges: this.connectCircles(circles)
        }))
    },
    circlesByMessageId: function () {
      return groupBy(
        (circle) => circle.data.messageId,
        this.circles
          .filter((circle) => circle.data.type === 'message')
      )
    },
    circles: function () {
      return this.packed.descendants()
        .filter((circle) => circle.depth >= 1)
    },
  },
  methods: {
    connectCircles: function (circles) {
      const points = circles
        .map((circle) => ({
          x: circle.x,
          y: circle.y,
        }))

      return points.slice(1)
        .map((point, index) =>([
          points[index],
          point
        ]))
    },
    textLength: function (message) {
      const text = message.text || message.caption
      return text.length
    },
    scale: function () {
      //  let scale = d3.scaleSqrt()
      //           .domain([0, d.data.Employment_High])
      //           .range([0,d.r]);
    },
    redraw: function () {
      const data = {
        name: 'root',
        children: [...this.hashtags
          .filter((hashtag) => hashtag.messages.length > 1)
          .map((hashtag) => ({
            name: hashtag.hashtag.slice(1),
            hashtag: hashtag.hashtag,
            type: 'hashtag',
            children: hashtag.messages
              .map((message) => ({
                name: `${hashtag.hashtag.slice(1)}-${message.message_id}`,
                messageId: message.reply_to || message.message_id,
                type: 'message',
                message,
                children: []
              }))
          })), ...this.hashtags
          .filter((hashtag) => hashtag.messages.length === 1)
          .map((hashtag) => {
            const message = hashtag.messages[0]
            return {
              name: `${hashtag.hashtag.slice(1)}-${message.message_id}`,
              messageId: message.reply_to || message.message_id,
              type: 'message',
              message,
              children: []
            }
          })
        ]
      }

      // https://observablehq.com/@mbostock/packing-circles-inside-a-rectangle

      // console.log(data)

      // const h = hierarchy(data)
      //   .sum(d => 1)
      //     // .sort((a, b) => {
      //     //   return b.value - a.value
      //     // })

      // const r =  pack()
      //   .size([500, 500])
      //   .padding(10)(h)

      const h = hierarchy(data)
        .sum((d) => {
          if (d.message) {
            const message = this.messagesById[d.message.message_id]
            return Math.sqrt(this.textLength(message.message))
          }
        })
        .sort((a, b) => {
          if (a.message && b.message) {
            const dateA = this.messagesById[a.message.message_id].date
            const dateB = this.messagesById[b.message.message_id].date
            return dateB - dateA
          }
        })

      const packed = pack()
          .size(this.size)
          .padding((d) => {
            return d.depth === 1 ? 10 : 50
          })(h)

      this.packed = packed
    },
    handleResize: function () {
      this.size = [
        this.$refs.container.offsetWidth,
        this.$refs.container.offsetHeight
      ]



      // na transition:  xlink:href attribute to “#path”
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.redraw()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

svg {
  box-sizing: border-box;
}

.edges path {
  stroke: black;
  opacity: 0;
  stroke-dasharray: 4 1;
  /* transition: opacity 0.2s; */
  fill: none;
}

.edges .active path {
  opacity: 1;
}

.message, .hashtag, circle, svg path {
  transition: d 0.5s, transform 0.5s, r 0.5s, stroke-width 0.2s;
}

.hashtag circle {
  fill: rgba(255, 255, 255, 0.3);
  stroke-width: 2;
  stroke: #3278ff;
}

circle.border {
  fill: none;
  stroke: rgba(255, 255, 255, 0);
  stroke-width: 20;
}

.hashtag:hover circle.circle {
  stroke-width: 3px;
}

.message circle {
  fill: white;
  stroke: black;

  /* fill: #3278ff;
  stroke: none; */
}

.message circle.file {
  stroke-width: .5;
}

.message .circle:hover, .message.active .circle {
  stroke-width: 2px;
}

svg text {
  text-anchor: middle;
  font-size: 13px;
}

</style>
