<template>
  <div class="transition-all ease-linear" :style="{left: ( bot.getPosition().x - 18 ) + 'px', top: ( bot.getPosition().y - 18) + 'px'}">
    <div class="relative px-1 py-1 rounded">
      <div v-if="toSelect === bot.getId()" class="absolute bg-white px-2 rounded text-center" style="bottom: -17px; left: 50%; transform: translate(-50%, 0);"> {{ bot.getName() }} </div>
      <img :src="bot.getStatus() == 'win' ? winBot : bot.getStatus() == 'normal' ? normalBot : loseBot" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bot: {
      type: Object,
      required: true
    },
    toSelect: {
      type: String,
      required: true
    },
    raceStatus: {
      type: Object
    }
  },
  watch: {
    // Look for changes in the bot's position
    bot: {
      handler(){
        this.givePosition()
      },
      deep: true
    },
    raceStatus: {
      handler(newValue, oldValue){

        if (oldValue.win == this.bot.getId()) {
          this.bot.setStatus('normal')
        } else if (oldValue.lose == this.bot.getId()) {
          this.bot.setStatus('normal')
        }

        if (newValue.win == this.bot.getId()) {
          this.bot.setStatus('win')
        } else if (newValue.lose == this.bot.getId()) {
          this.bot.setStatus('lose')
        } else {
          this.bot.setStatus('normal')
        }
      },
      deep: true
    }
  },
  data(){
    return {
      winBot: require('../assets/icons/bot_fill_win.svg'),
      normalBot: require('../assets/icons/bot_fill_normal.svg'),
      loseBot: require('../assets/icons/bot_fill_lose.svg')
    }
  },
  methods: {
    givePosition(){
      this.$emit('give-position', { id: this.bot.getId() , distance: this.bot.getDistanceToFinish()})
    }
  }
}
</script>