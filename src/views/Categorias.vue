<template>
  <div class="categorias principal fondo2">
    <div class="cuadro">
      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo1"
          type="submit"
          v-on:click="cat = 'animales'"
          @click="siguiente()"
        >
          <h5>
            <img
              src="https://beagleboard.org/static/Drivers/Windows/src/files/beagle.ico"
              width="42"
            />
            ANIMALES
          </h5>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo1"
          type="submit"
          v-on:click="cat = 'frutas'"
          @click="siguiente()"
        >
          <h5>
            <img
              src="https://image.flaticon.com/icons/png/128/3082/3082025.png"
              width="42"
            />
            FRUTAS
          </h5>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo1"
          type="submit"
          v-on:click="cat = 'musica'"
          @click="siguiente()"
        >
          <h5>
            <img
              src="https://arigar.com/wp-content/uploads/2017/06/favicon-music.png"
              width="42"
            />
            MÚSICA
          </h5>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo1"
          type="submit"
          v-on:click="cat = 'vehiculos'"
          @click="siguiente()"
        >
          <h5>
            <img
              src="https://cdn.pixabay.com/photo/2016/12/31/01/43/auto-1941990_960_720.png"
              width="50"
            />
            VEÍCULOS
          </h5>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo1"
          type="submit"
          v-on:click="cat = 'logos'"
          @click="siguiente()"
        >
          <h5>
            <img
              src="https://n-bici.com/wp-content/uploads/2016/05/cropped-favicon.png"
              width="42"
            />
            LOGOS
          </h5>
        </button>
      </div>

      <div class="cuadro-hijo">
        <button
          class="botton1 botton-categorias fondo1"
          type="submit"
          v-on:click="cat = 'dibujos'"
          @click="siguiente()"
        >
          <h5>
            <img
              src="https://www.defensorianinez.cl/wp-content/uploads/2018/08/favicon.png"
              width="42"
            />
            DIBUJOS
          </h5>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categorias",
  data() {
    return {
      cat: "",
    };
  },
  mounted() {
    localStorage.removeItem("categoria");
  },
  methods: {
    siguiente() {
      localStorage.setItem("categoria", this.cat);
      this.$router.push("/Columnas");
    },
  },
};
</script>