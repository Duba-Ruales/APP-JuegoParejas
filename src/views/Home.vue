<template>
  <div class="principal fondo1">
    <div class="cuadro">
      <button class="botton1 botton2 fondo2" type="submit" @click="siguiente()">
        <h2>JUGAR AHORA</h2>
      </button>
    </div>
  </div>
  <!--<a href="/Categorias" class="button">jugar</a>-->
  <!--<div class="animation-area">
    <ul class="box-area">
      <li></li>
    </ul>
  </div>-->
</template>

<script>
export default {
  name: "Home",
  mounted() {
    localStorage.clear();
  },
  methods: {
    siguiente() {
      localStorage.setItem("categoria", this.cat);
      this.$router.push("/Categorias");
    },
  },
};
</script>
