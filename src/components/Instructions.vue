<template>
  <div class="absolute z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-25" style="max-height: calc(100vh - 2rem);">
    <div class="modal relative bg-blue-600 text-white my-4 mx-4 max-h-full rounded px-4 py-4 shadow overflow-auto">
      <h1 class="font-bold text-2xl text-center" >!Bienvenido!</h1>
      <img @click="closeInstructions" class="absolute cursor-pointer" style="top: 10px; right: 10px;" :src="require('../assets/icons/x.svg')" alt="">
      <div>
        <h2 class="font-bold text-lg">¿De que se trata?</h2>
        <p>Carrera de bots por Bogotá</p>
      </div>
      <div>
        <h2 class="font-bold text-lg">¿Como funciona?</h2>
        <p>En el menu apareceran apareceran 3 botones los cuales el primero inicia la carrera, el segundo reinicia el estado de la carrera y el tercero añade un bot mas a la carrera. Para ver el estado de cada bot aparecera una flecha la cual permite ver cada uno de los bots, seleccionarlo y ver en donde se encuentra.</p>
      </div>
      <div>
        <h2 class="font-bold text-lg">¿Como esta hecho?</h2>
        <ul>
          <li>VueJS (Fronted)</li>
          <li>TypeScript (Lógica)</li>
          <li>Tailwind (Estilos)</li>
        </ul>
      </div>

      <div>
        <h2 class="font-bold text-lg">Objetivos</h2>
        <ol>
          <li>✅ La interfaz debe mostrar un mapa de Google Maps y un recuadro donde se listan los bots. El número inicial de bots que empiezan en la competencia debe ser un número aleatorio entre 5 y 10.</li>
          <li>✅ Los bots se mueven en dirección al punto marcado por el usuario como meta. Cada bot solo puede hacer un movimiento cada 1 segundo de una distancia aleatoria entre 50 y 100 metros. </li>
          <li>✅ Cada bot tiene una batería que dura 100 unidades, y cada cambio de posición gasta un número aleatorio entre 10 y 30 unidades. </li>
          <li>✅ Cuando un bot quede sin batería debe detenerse por 6 segundos para volver a empezar con 100 unidades. </li>
          <li>✅ Se debe mostrar un botón “Agregar nuevo Bot”, que al presionarse incrementa en 1 el número de bots en competencia. Al agregarse, se ubica de manera aleatoria en la ciudad ❌ y de inmediato inicia su trayecto a la meta.</li>
          <li>✅ La interfaz debe mostrar de manera fácil el estado de toda la competencia, estado de los bots, posición de cada uno, distancia hacia la meta y todo lo que considere útil para el usuario</li>
          <li>❌ El bot que esté más cerca a la meta debe mostrarse con color verde. El último con color rojo, y el resto con color amarillo.</li>
          <li>✅ Alojar la prueba en algún servicio de tal manera que nos puedas enviar la url para nosotros visualizarlo en funcionamiento.</li>
        </ol>
      </div>
      
    </div>
  </div>
  
</template>

<script>
export default {
  methods: {
    closeInstructions(){
      this.$emit('close-instructions');
    }
  }
}
</script>