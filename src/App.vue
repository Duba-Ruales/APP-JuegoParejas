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
.prueba {
  text-align: center;
  color: rgb(255, 255, 255);
}
/* swal */
.swal-overlay {
  background-color: rgba(0, 0, 0, 0.842);
}

/* Alerte de pausa lado de arriba */
.swal-modal {
  background-color: rgb(76, 215, 250);
  border: 6px solid rgb(245, 245, 245);
}
.swal-title {
  margin: 0px;
  font-size: 18px;
  margin-bottom: 28px;
  color: rgb(5, 5, 5);
  text-transform: uppercase;
}

/* Texto de aciertos en pausa */
.swal-text {
  color: rgb(0, 0, 0);
  height: 1px;
  font-size: x-large;
}

/* Alerta de pausa  lado de abajo */
.swal-footer {
  background-color: rgb(76, 215, 250);
  margin-top: 32px;
  border-top: 1px solid #2ec54f00;
  overflow: hidden;
  text-align: center;
}
/* Botones de Reanudar y salir */
.swal-button {
  padding: 10px 15px;
  border-radius: 3px;
  font-size: 18px;
  border: 1px solid #000000;
  text-shadow: 0px -1px 0px rgba(131, 118, 118, 0);
  color: rgb(0, 0, 0);
}
.swal-button--reiniciar {
  background-color: #ff411f;
}
.swal-button--home {
  background-color: rgba(206, 22, 22, 0.931);
}
/*fondos de las vistas*/
.fondo1 {
  background: url("assets/fondo/fondo1.jpg");
}
.fondo2 {
  background: url("assets/fondo/fondo2.jpg");
}

/*centrado vertical de categorias*/
.padre {
  background-size: 135%;
  text-align: center;
  width: 100%;
  height: 100vh;
  display: table;
}

/* posision de las categorias en la vista */
.bloque {
  display: table-cell;
  vertical-align: middle;
}

/* Alineacion de las categorias 3 filas */
.bloques {
  width: 50%;
  padding: 3px 3px 3px 5px;
  display: inline-block;
}

/* Lasimagenes en el juego */
.target-image {
  /* padding: 3px; */
  width: 103%;
  height: auto;
  border-radius: 5px;
  border-style: solid;
  /* border-spacing: 0; */
  border-width: 0px;
  border-color: black;
}

img.card-img-top.girar {
  animation: fadein 2s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/*animacion del boton*/
.bttn {
  background-size: 100%;
  display: block;
  padding: 6px;
  text-align: center;
  margin: auto;
  color: rgb(255, 255, 255);
  letter-spacing: 0px;
  transition: all 300ms;
  border-color: rgb(255, 255, 255);
  border-width: 2px;
  border-style: solid;
  /* font-family: 'Arial Black'; */
  text-shadow: black -2px 2px;
  border-bottom: 6px solid #000;
}

.bttn2 {
  background-size: 100%;
  display: block;
  padding: 6px;
  text-align: center;
  margin: auto;
  color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  border-width: 2px;
  text-shadow: black -2px 2px;
  /* border-bottom: 6px solid #000; */
}

.img-btn {
  width: 15px;
  height: 15px;
}
.btton-pause {
  vertical-align: middle;
  border-radius: 5px;
  border-color: rgb(22, 22, 22);
  border-width: 2px;
  border-style: solid;
  padding: 3px 7px;
  background: none;
}
.bttn-inicio {
  text-transform: uppercase;
  border-radius: 20px;
  width: 70%;
  height: 60px;
  font-size: 18px;
}
.bttn-cat {
  border-radius: 10px;
  width: 98%;
  height: 70px;
  font-size: small;
}
.bttn:hover {
  transform: translateY(5px);
  box-shadow: 0px 30px 5px -15px rgba(0, 0, 0, 0.3);
}
/*FONDO*/
.animation-area {
  background: linear-gradient(to bottom, #3700ff, #110058);
  width: 100%;
  height: 100vh;
}
.box-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.box-area li {
  position: absolute;
  display: block;
  list-style: none;
  width: 25px;
  height: 25px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 35s linear infinite;
  bottom: -150px;
}
.box-area li:nth-child(1) {
  left: 80%;
  width: 80%;
  height: 80%;
  animation-delay: 0s;
}
.box-area li:nth-child(2) {
  left: 12%;
  width: 30px;
  height: 30px;
  animation-delay: 1.5s;
  animation-duration: 10s;
}
.box-area li:nth-child(3) {
  left: 70%;
  width: 100px;
  height: 100px;
  animation-delay: 5.5s;
}
.box-area li:nth-child(4) {
  left: 42%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 15s;
}
.box-area li:nth-child(5) {
  left: 65%;
  width: 40px;
  height: 40px;
  animation-delay: 0s;
}
.box-area li:nth-child(6) {
  left: 15%;
  width: 110px;
  height: 110px;
  animation-delay: 3.5s;
}
@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) rotate(360deg);
    opacity: 0;
  }
}
</style>
