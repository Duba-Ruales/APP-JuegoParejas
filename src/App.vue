<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}

.fondo1 {
  background: url("assets/fondo/fondo1.jpg");
}
.fondo2 {
  background: url("assets/fondo/fondo2.jpg");
}

/*centrado*/
.principal {
  background-size: 135%;
  text-align: center;
  width: 100%;
  height: 100vh;
  display: table;
}
.cuadro {
  display: table-cell;
  vertical-align: middle;
}
.cuadro-hijo {
  width: 50%;
  padding: 3px 3px 3px 5px;
  display: inline-block;
}

/*animacion del boton*/
.botton1 {
  background-size: 100%;
  display: block;
  padding: 10px;
  text-align: center;
  margin: auto;
  color: white;
  letter-spacing: 1px;
  transition: all 300ms;
  border-color: white;
  border-width: 2px;
  border-style: solid;
  text-shadow: black -2px 2px;
  border-bottom: 6px solid #000;
  position: relative;
}
.img-btn {
  width: 11px;
  height: 11px;
}
.btton-pause {
  float: left;
  vertical-align: middle;
  border-radius: 5px;
  border-color: rgb(14, 13, 13);
  border-width: 2px;
  border-style: solid;
  padding: 2px 5px;
  background: none;
}
.botton2 {
  text-transform: uppercase;
  border-radius: 20px;
  width: 70%;
  height: 60px;
  font-size: 18px;
}
.botton-categorias {
  border-radius: 10px;
  width: 98%;
  height: 70px;
  font-size: small;
}
.botton1:hover {
  transform: translateY(5px);
  box-shadow: 0px 30px 5px -15px rgba(0, 0, 0, 0.3);
}
</style>
