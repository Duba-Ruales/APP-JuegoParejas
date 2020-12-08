<template>
  <div class="categorias principal fondo1">
    <div class="cuadro">
      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo2"
          type="submit"
          v-on:click="(ancho = 2), (alto = 3)"
          @click="siguiente()"
        >
          <h4>
            <img
              src="https://www.gifsanimados.org/data/media/111/flecha-imagen-animada-0067.gif"
              width="40"
            />
            3x2
          </h4>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo2"
          type="submit"
          v-on:click="(ancho = 3), (alto = 4)"
          @click="siguiente()"
        >
          <h4>
            <img
              src="https://www.gifsanimados.org/data/media/111/flecha-imagen-animada-0067.gif"
              width="40"
            />
            4x3
          </h4>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo2"
          type="submit"
          v-on:click="(ancho = 4), (alto = 5)"
          @click="siguiente()"
        >
          <h4>
            <img
              src="https://www.gifsanimados.org/data/media/111/flecha-imagen-animada-0067.gif"
              width="40"
            />
            5x4
          </h4>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo2"
          type="submit"
          v-on:click="(ancho = 5), (alto = 6)"
          @click="siguiente()"
        >
          <h4>
            <img
              src="https://www.gifsanimados.org/data/media/111/flecha-imagen-animada-0067.gif"
              width="40"
            />
            6x5
          </h4>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo2"
          type="submit"
          v-on:click="(ancho = 7), (alto = 8)"
          @click="siguiente()"
        >
          <h4>
            <img
              src="https://www.gifsanimados.org/data/media/111/flecha-imagen-animada-0067.gif"
              width="40"
            />
            8x7
          </h4>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo2"
          type="submit"
          v-on:click="(ancho = 8), (alto = 9)"
          @click="siguiente()"
        >
          <h4>
            <img
              src="https://www.gifsanimados.org/data/media/111/flecha-imagen-animada-0067.gif"
              width="40"
            />
            9x8
          </h4>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cuadriculas",
  data() {
    return {
      ancho: 0,
      alto: 0,
    };
  },
  mounted() {
    localStorage.removeItem("alto");
    localStorage.removeItem("ancho");
    if (localStorage.getItem("categoria") === null) {
      this.$router.push("/Categorias");
    }
  },
  methods: {
    siguiente() {
      localStorage.setItem("alto", this.alto);
      localStorage.setItem("ancho", this.ancho);
      this.$router.push("/Memora");
    },
  },
};
</script>