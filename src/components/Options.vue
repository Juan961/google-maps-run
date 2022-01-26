<template>
  <section class="options w-full bg-blue-600 flex flex-col gap-4 justify-between absolute z-10 max-h-min overflow-auto py-2 px-2 rounded">
    <div class="flex justify-between text-white">
      <h3 class="font-bold">Bots</h3>
      <img @click="showBots" class="cursor-pointer" :src="require('../assets/icons/down_arrow.svg')" alt="">
    </div>
    <div v-if="showListBots" class="flex flex-col gap-2 text-black">
      <div class="bg-white rounded px-1 py-1 cursor-pointer" v-for="bot in bots" @click="viewBot(bot.getId())" :key="bot.id">
        <p>Nombre: {{ bot.getName() }}</p>
        <p>Bateria: {{ bot.getBatery() == 0 ? 'Recargando ... ' : bot.getBatery() }}</p>
        <p>Distancia a meta: {{ bot.getDistanceToFinish() == -1 ? 'Sin comenzar': Math.floor(bot.getDistanceToFinish()) }} </p>
      </div>
    </div>
    <div class="flex justify-between">
      <button class="text-white bg-white bg-opacity-25 transition duration-300 hover:bg-opacity-100 hover:text-blue-500 py-1 px-2 rounded" @click="startTheRace">Start</button>
      <button class="text-white bg-white bg-opacity-25 transition duration-300 hover:bg-opacity-100 hover:text-blue-500 py-1 px-2 rounded" @click="reStartTheRace">Restart</button>
      <button class="text-white bg-white bg-opacity-25 transition duration-300 hover:bg-opacity-100 hover:text-blue-500 py-1 px-2 rounded" type="button" @click="addNewBot">Add new bot</button>
    </div>
    
  </section>
</template>

<script>
import '@/assets/tailwind.css'

export default {
  name: 'Options',
  props: {
    bots: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      showListBots: false
    }
  },
  methods: {
    showBots(){
      this.showListBots = !this.showListBots;
    },
    viewBot(id){
      this.showBots()
      this.$emit('view-bot', id);
    },
    addNewBot(){
      this.$emit('add-new-bot')
    },
    reStartTheRace(){
      this.$emit('re-start-the-race')
    },
    startTheRace(){
      this.$emit('start-the-race')
    }
  }
}
</script>

<style>
.options {
  top: 10px;
  left: 10px;
  overflow: auto;
  min-height: 92px;
  max-height: calc(100vh - 20px);
  width: calc(100% - 20px);
  max-width: 350px;
}
</style>