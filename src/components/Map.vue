<template>
  <main class="relative w-screen h-screen overflow-hidden">
    <iframe
      class="absolute w-full h-full"
      style="border:0; width:100%; height:100%"
      loading="lazy"
      allowfullscreen
      :src="`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=Bogota,Colombia`">
    </iframe>
    <div class="absolute w-full h-full bg-black opacity-10" @click="addMark">
      <div class="absolute w-full h-full"></div>
    </div>
    <img v-if="mark !== null" class="absolute" :src="location" alt="" :style="{left: ( mark.x - 18) + 'px', top: (mark.y - 36) + 'px'}">
    <Bot v-for="bot in bots" :raceStatus="win_lose" @givePosition="updatePositions($event)" :toSelect="select" :key="bot.id" class="absolute" :bot="bot" />
  </main>
</template>

<script>
import Bot from './Bot.vue'

export default {
  components: {
    Bot
  },
  props: {
    reload: {
      type: Boolean
    },
    bots: {
      type: Array,
      required: true
    },
    select: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      API_KEY: process.env.VUE_APP_API_KEY,
      positions: [],
      win_lose: {
        win: null,
        lose: null,
      },
      mark: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      location: require('../assets/icons/place.svg')
    }
  },
  mounted(){
    window.addEventListener('resize', () => {
      this.mark.x = window.innerWidth / 2
      this.mark.x = window.innerHeight / 2
    })
  },
  methods: {
    addMark(e) {
      const x = e.clientX;
      const y = e.clientY;
      this.mark = {x, y};
      this.$emit('add-mark', {x, y});
    },
    updatePositions(data){
      const index = this.positions.findIndex(position => position.id === data.id)

      if(index !== -1){
        this.positions[index].distance = data.distance
      } else {
        this.positions.push(data)
      }

    }
  },
  watch: {
    reload(){
      this.positions = []
      this.win_lose = {
        win: null,
        lose: null,
      }
      this.mark = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      }
      this.$emit('reloaded')
    },
    positions: {
      handler(){
        if (this.positions.length > 0) {
          let lose = {
            id: this.positions[0].id,
            distance: this.positions[0].distance
          }
          let win = {
            id: this.positions[0].id,
            distance: this.positions[0].distance
          }
          this.positions.forEach(bot => {
            if(bot.distance > lose.distance){
              lose.id = bot.id
              lose.distance = bot.distance
            }
            if(bot.distance < win.distance){
              win.id = bot.id
              win.distance = bot.distance
            }
          })

          this.win_lose.win = win.id
          this.win_lose.lose = lose.id  
        }
        
      },
      deep: true
    }
  }
}
</script>