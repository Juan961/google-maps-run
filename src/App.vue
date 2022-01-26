<template>
  <Instructions @close-instructions="closeInstructions" v-if="showIntructions" />
  <Options @add-new-bot="addNewBot" @view-bot="selectBot($event)" @re-start-the-race="raceAgain" @startTheRace="start" :bots="bots" />
  <Map :bots="bots" @reloaded="reloadFalse" :reload="reload" :select="selectedBot" @add-mark="changeMark"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { initialBots, generateBot, Bot } from '@/logic/bots'
import Map from './components/Map.vue';
import Options from './components/Options.vue';
import Instructions from './components/Instructions.vue';

import '@/assets/tailwind.css'

export default defineComponent({
  name: 'App',
  components: {
    Map,
    Options,
    Instructions
  },
  data(){
    return {
      bots: [] as Array<Bot>,
      mark: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      showOptions: false,
      showIntructions: true,
      reload: false,
      selectedBot: 'null',
      positions: [] as Array<{x: number, y: number}>
    }
  },
  mounted(){
    this.generateBots(window.innerWidth, window.innerHeight)
  },
  methods: {
    reloadFalse(){
      this.reload = false
    },
    generateBots(width:number, height:number){
      let numberOfBots:number = initialBots()
      for (let i = 0; i < numberOfBots; i++) {
        let newBot:Bot = generateBot(width, height)
        this.bots.push(newBot)
      }
    },
    toggleMenu(){
      this.showOptions = !this.showOptions 
    },
    closeInstructions(){
      this.showIntructions = !this.showIntructions
    },
    selectBot(id:any){
      this.selectedBot = id
    },
    addNewBot(){
      let newBot:Bot = generateBot(window.innerWidth, window.innerHeight)
      this.bots.push(newBot)
    },
    changeMark(mark:any){
      this.mark.x = mark.x
      this.mark.y = mark.y
      /* this.raceAgain() */
    },
    raceAgain(){
      this.bots = []
      this.reload = true
      this.generateBots(window.innerWidth, window.innerHeight)
    },
    start(){
      this.bots.forEach(bot => {
        bot.run([this.mark.x, this.mark.y])
      })

    }

  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
