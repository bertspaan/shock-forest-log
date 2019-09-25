<template>
  <div v-if="packed" class="container">
    <svg :width="size[0]" :height="size[1]">
      <g v-for="circle in circles"
        :key="circle.data.name"
        :style="{
          transform: `translate(${circle.x}px, ${circle.y}px)`
        }">
        <circle :r="circle.r" :id="`circle-${circle.data.name.slice(1)}`"
          :style="{
            fill:  circle.data.depth === 1 ? 'rgba(50, 120, 255, 0.04)' : '',
            stroke: circle.data.depth === 1 ? 'rgba(0, 0, 0, 0.05)' : 'black'
          }" />
        <template v-if="circle.data.depth === 1">
          <path :id="`path-${circle.data.name.slice(1)}`" :d="`
            M ${circle.x - circle.r * 1.05}, ${circle.y}
            a ${circle.r * 1.05},${circle.r * 1.05} 0 0,1 ${circle.r * 2 * 1.05},0`"
            :style="{
              fill: 'none',
              transform: `translate(${-circle.x}px, ${-circle.y}px)`
            }"
          />

          <text v-if="circle.data.depth === 1" >
            <textPath :xlink:href="`#path-${circle.data.name.slice(1)}`"
              startOffset="50%" >
              {{ circle.data.name }}
            </textPath>
          </text>
        </template>
      </g>
    </svg>
  </div>
</template>

<script>
import { hierarchy, pack } from 'd3-hierarchy'

export default {
  name: 'graph',
  components: {
  },
  props: {
    messages: Array,
    hashtags: Array
  },
  data: function () {
    return {
      size: [500, 500],
      packed: undefined
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
    svgPatterns: function () {
    //  <defs>
    //   <pattern id="image" x="0%" y="0%" height="100%" width="100%"
    //             viewBox="0 0 512 512">
    //     <image x="0%" y="0%" width="512" height="512" xlink:href="https://cdn3.iconfinder.com/data/icons/people-professions/512/Baby-512.png"></image>
    //   </pattern>
    // </defs>
    },
    circles: function () {
      return this.packed.descendants()
        .filter((circle) => circle.data.depth >= 1)
    },
    messagesById: function () {
      return Object.fromEntries(this.messages
        .map((message) => [message.message.message_id, message]))
    }
  },
  methods: {
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
          // .filter((hashtag) => hashtag.messages.length > 1)
          .map((hashtag) => ({
            name: hashtag.hashtag,
            type: 'hashtag',
            depth: 1,
            children: hashtag.messages
              .map((message) => ({
                name: `${hashtag.hashtag}-${message.reply_to || message.message_id}`,
                type: 'message',
                message,
                depth: 2,
                children: []
              }))
          }))
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
console.log(this.size)
      const packed = pack()
          .size(this.size)
          .padding(35)
        (hierarchy(data)
          .sum((d) => {
            if (d.message) {
              const message = this.messagesById[d.message.message_id]
              // console.log(message.message)
              return Math.sqrt(this.textLength(message.message))
              // return 9
            }
          })
          .sort((a, b) => b.value - a.value))

      this.packed = packed
    },
    handleResize: function () {
      this.size = [window.innerWidth, window.innerHeight]
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
svg {
  box-sizing: border-box;
}

svg circle {
  fill: rgba(255, 255, 255, 0.01);
  stroke: black;
  transition: stroke-width 0.1s;
}

svg circle:hover {
  stroke-width: 3px;
}

svg text {
  text-anchor: middle;
  font-size: 13px;
}

</style>
