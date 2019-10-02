import ReconnectingWebSocket from 'reconnecting-websocket'

export default {
  name: 'WebSocket',
  data: function () {
    return {
      rws: new ReconnectingWebSocket('wss://shock-forest-bot.herokuapp.com/ws')
    }
  },
  created: function () {
    this.rws.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data)
        this.$emit('ws:message', message)
      } catch (err) {
        throw err
      }
    })
  }
}
