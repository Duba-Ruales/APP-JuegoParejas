<template>
  <div class="prueba fondo2 ">
    <div class="col-12 ">
      <h1 class="text-context">MEMORY MATCH</h1>
      <p>
        <button class="btton-pause" @click="pause()">
          <img class="img-btn" src="../assets/fondo/pause.png" alt="Pause" />
        </button>

        <span class="h5"> Intentos: </span>{{ intentos }}
        <span class="h5">Aciertos: </span>{{ aciertos }}
        <span class="h5">Tiempo: </span><span id="minutos"></span> :
        <span id="segundos"></span>
      </p>
    </div>
  </div>
  <div v-for="(fila, indiceFila) in memorama" :key="indiceFila" class="row">
    <div
      :key="indiceFila + '' + indiceImagen"
      class="col"
      v-for="(imagen, indiceImagen) in fila"
    >
      <div class="mb-3 prueba">
        <img
          @click="voltear(indiceFila, indiceImagen)"
          :class="{ girar: imagen.mostrar }"
          :src="imagen.mostrar ? imagen.ruta : NOMBRE_IMAGEN_OCULTA"
          class="target-image"
        />
      </div>
    </div>
  </div>
<!--   <img src="../assets/musica/13.jpg" alt="" /> -->
</template>

<script>
import swal from "sweetalert";
import React from "react";
var cronometro;
export default {
  name: "Juego",
  data() {
    return {
      categoria: "",
      imagenes: [],
      animales: [],
      frutas: [],
      vehiculos: [],
      animales: [],
      COLUMNAS: 0,
      alto: 0,
      ciclo: 0,
      intentos: 0,
      aciertos: 0,
      memorama: [],
      NOMBRE_IMAGEN_OCULTA:
        "https://coleenriquealonso.files.wordpress.com/2014/12/signo-de-interrogacion.gif",
      SEGUNDOS_ESPERA_VOLTEAR_IMAGEN: 1,
      ultimasCoordenadas: {
        indiceFila: null,
        indiceImagen: null,
      },
      intentos: 0,
      aciertos: 0,
      esperandoTimeout: false,
      probar: [],

      horas: 0,
      min: 0,
      seg: 0,
    };
  },
  mounted() {
    if (
      localStorage.getItem("alto") === null &&
      localStorage.getItem("ancho") === null
    ) {
      this.$router.push("/Cuadriculas");
    } else {
      let a;
      (this.categoria = localStorage.getItem("categoria")),
        (this.COLUMNAS = parseInt(localStorage.getItem("ancho")));
      this.alto = parseInt(localStorage.getItem("alto"));
      this.ciclo = this.alto * this.COLUMNAS;
      //URL DE FRUTAS
      this.frutas = [
        "https://cdn.pixabay.com/photo/2017/07/20/02/14/grapes-2520999__340.png",
        "https://cdn.pixabay.com/photo/2018/07/22/18/38/grapes-3555214__340.jpg",
        "https://cdn.pixabay.com/photo/2012/02/26/10/59/apple-17092__340.jpg",
        "https://cdn.pixabay.com/photo/2018/04/07/16/52/fruit-3298948__340.jpg",
        "https://cdn.pixabay.com/photo/2018/09/16/13/22/apples-3681500_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/01/08/16/26/fruit-3921531_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/07/20/02/14/grapes-2520999__340.png",
        "https://cdn.pixabay.com/photo/2018/07/22/18/38/grapes-3555214__340.jpg",
        "https://cdn.pixabay.com/photo/2012/02/26/10/59/apple-17092__340.jpg",
        "https://cdn.pixabay.com/photo/2018/04/07/16/52/fruit-3298948__340.jpg",
        "https://cdn.pixabay.com/photo/2018/09/16/13/22/apples-3681500_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/01/08/16/26/fruit-3921531_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/07/20/02/14/grapes-2520999__340.png",
        "https://cdn.pixabay.com/photo/2018/07/22/18/38/grapes-3555214__340.jpg",
        "https://cdn.pixabay.com/photo/2012/02/26/10/59/apple-17092__340.jpg",
        "https://cdn.pixabay.com/photo/2018/04/07/16/52/fruit-3298948__340.jpg",
        "https://cdn.pixabay.com/photo/2018/09/16/13/22/apples-3681500_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/01/08/16/26/fruit-3921531_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/07/20/02/14/grapes-2520999__340.png",
        "https://cdn.pixabay.com/photo/2018/07/22/18/38/grapes-3555214__340.jpg",
        "https://cdn.pixabay.com/photo/2012/02/26/10/59/apple-17092__340.jpg",
        "https://cdn.pixabay.com/photo/2018/04/07/16/52/fruit-3298948__340.jpg",
        "https://cdn.pixabay.com/photo/2018/09/16/13/22/apples-3681500_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/01/08/16/26/fruit-3921531_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/07/20/02/14/grapes-2520999__340.png",
        "https://cdn.pixabay.com/photo/2019/07/22/10/53/blackberries-4354808_960_720.jpg",
        "https://cdn.pixabay.com/photo/2012/02/26/10/59/apple-17092__340.jpg",
        "https://cdn.pixabay.com/photo/2018/04/07/16/52/fruit-3298948__340.jpg",
        "https://cdn.pixabay.com/photo/2018/09/16/13/22/apples-3681500_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/01/08/16/26/fruit-3921531_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/01/20/15/06/orange-1995056_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/07/22/18/38/grapes-3555214__340.jpg",
        "https://cdn.pixabay.com/photo/2012/02/26/10/59/apple-17092__340.jpg",
        "https://cdn.pixabay.com/photo/2018/04/07/16/52/fruit-3298948__340.jpg",
        "https://cdn.pixabay.com/photo/2018/09/16/13/22/apples-3681500_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/01/08/16/26/fruit-3921531_960_720.jpg",
      ];

      //URL DE INSTRUMENTOS
      this.musica = [""];

      //URL DE ANIMALES
      this.animales = [
        //locales
        "",
      ];

      switch (this.categoria) {
        case "animales":
          this.imagenes = this.animales;
          break;
        case "frutas":
          this.imagenes = this.frutas;
          break;
        case "vehiculos":
          this.imagenes = this.vehiculos;
          break;
        case "musica":
          this.imagenes = this.musica;
          break;
      }
      this.tiempo();
      this.reiniciarJuego();
    }
  },
  methods: {
    tiempo() {
      let contador_s = this.seg;
      let contador_m = this.min;
      let contador_h = 0;
      let s = document.getElementById("segundos");
      let m = document.getElementById("minutos");
      (m.innerHTML = contador_m),
        (s.innerHTML = contador_s),
        (cronometro = setInterval(function() {
          if (contador_s === 60) {
            contador_m++;
            contador_s = 0;
            m.innerHTML = contador_m;
            if (contador_m === 60) {
              contador_m = 0;
              contador_h++;
            }
          }
          s.innerHTML = contador_s;
          contador_s++;
          this.horas = contador_h;
          this.seg = contador_s;
          this.min = contador_m;
          console.log(this.horas + ":" + this.min + ":" + this.seg);
        }, 1000));
    },
    reiniciarJuego() {
      let memorama = [];
      let probar = [];
      this.imagenes.forEach((imagen, indice) => {
        let imagenDeMemorama = {
          ruta: imagen,
          mostrar: false, // No se muestra la original
          acertada: false, // No es acertada al inicio
        };
        // Poner dos veces la misma imagen
        probar.push(imagenDeMemorama, Object.assign({}, imagenDeMemorama));
      });

      //solo tomar la cantidad requerida
      for (let i = 0; i < this.ciclo; i++) {
        memorama[i] = probar[i];
      }

      // Sacudir o mover arreglo; es decir, hacerlo aleatorio
      this.mezclarArreglo(memorama);

      // Dividirlo en subarreglos o columnas
      let memoramaDividido = [];
      for (let i = 0; i < this.ciclo; i += this.COLUMNAS) {
        memoramaDividido.push(memorama.slice(i, i + this.COLUMNAS));
      }
      // Reiniciar intentos
      this.intentos = 0;
      this.aciertos = 0;
      // Asignar a instancia de Vue para que lo dibuje
      this.memorama = memoramaDividido;
    },

    // Se desencadena cuando se hace click en la imagen
    voltear(indiceFila, indiceImagen) {
      // Si se está regresando una imagen a su estado original, detener flujo
      if (this.esperandoTimeout) {
        return;
      }
      // Si es una imagen acertada, no nos importa que la intenten voltear
      if (this.memorama[indiceFila][indiceImagen].acertada) {
        return;
      }

      // Si es la primera vez que la selecciona
      if (
        this.ultimasCoordenadas.indiceFila === null &&
        this.ultimasCoordenadas.indiceImagen === null
      ) {
        this.memorama[indiceFila][indiceImagen].mostrar = true;
        this.ultimasCoordenadas.indiceFila = indiceFila;
        this.ultimasCoordenadas.indiceImagen = indiceImagen;
        return;
      }

      // Si se selecciona la misma imagen ya seleccionada
      if (
        this.ultimasCoordenadas.indiceFila === indiceFila &&
        this.ultimasCoordenadas.indiceImagen === indiceImagen
      ) {
        return;
      }

      // Si es el que estaba mostrada, lo ocultamos de nuevo
      let imagenSeleccionada = this.memorama[indiceFila][indiceImagen];
      let ultimaImagenSeleccionada = this.memorama[
        this.ultimasCoordenadas.indiceFila
      ][this.ultimasCoordenadas.indiceImagen];
      if (
        indiceFila === this.ultimasCoordenadas.indiceFila &&
        indiceImagen === this.ultimasCoordenadas.indiceImagen
      ) {
        this.memorama[indiceFila][indiceImagen].mostrar = false;
        this.ultimasCoordenadas.indiceFila = null;
        this.ultimasCoordenadas.indiceImagen = null;
        this.aumentarIntento();
        return;
      }

      // En caso de que la haya encontrado, ¡acierta!
      // Se basta en ultimaImagenSeleccionada
      this.memorama[indiceFila][indiceImagen].mostrar = true;
      if (imagenSeleccionada.ruta === ultimaImagenSeleccionada.ruta) {
        this.aciertos++;
        this.memorama[indiceFila][indiceImagen].acertada = true;
        this.memorama[this.ultimasCoordenadas.indiceFila][
          this.ultimasCoordenadas.indiceImagen
        ].acertada = true;
        this.ultimasCoordenadas.indiceFila = null;
        this.ultimasCoordenadas.indiceImagen = null;
        // Cada que acierta comprobamos si ha ganado
        if (this.haGanado()) {
          this.indicarVictoria();
        }
      } else {
        // Si no acierta, entonces giramos ambas imágenes
        this.esperandoTimeout = true;
        setTimeout(() => {
          this.memorama[indiceFila][indiceImagen].mostrar = false;
          this.memorama[indiceFila][indiceImagen].animacion = false;
          this.memorama[this.ultimasCoordenadas.indiceFila][
            this.ultimasCoordenadas.indiceImagen
          ].mostrar = false;
          this.ultimasCoordenadas.indiceFila = null;
          this.ultimasCoordenadas.indiceImagen = null;
          this.esperandoTimeout = false;
        }, this.SEGUNDOS_ESPERA_VOLTEAR_IMAGEN * 1000);
        this.aumentarIntento();
      }
    },

    // Aumenta un intento
    aumentarIntento() {
      this.intentos++;
    },

    // Método que indica si el jugador ha ganado
    haGanado() {
      return this.memorama.every((arreglo) =>
        arreglo.every((imagen) => imagen.acertada)
      );
    },

    //juego en pausa
    pause() {
      swal({
        icon:
          "https://pauseonline.s3.eu-west-2.amazonaws.com/wp-content/uploads/2019/11/01131317/Pause-Logo.png",

        text: "ACIERTOS: " + this.aciertos + "",
        buttons: {
          reiniciar: {
            text: "REANUDAR",
          },
          home: {
            text: "SALIR",
          },
        },
        closeOnClickOutside: false,
        allowOutsideClick: false,
      }).then((value) => {
        switch (value) {
          case "reiniciar":
            break;
          case "home":
            clearInterval(cronometro);
            this.$router.push("/Categorias");
            break;
        }
      });
    },
    // Mostrar alerta de victoria y reiniciar juego
    indicarVictoria() {
      clearInterval(cronometro);
      (this.horas = 0),
        (this.min = 0),
        (this.seg = 0),
        swal({
          icon: "https://www.flaticon.es/svg/static/icons/svg/1986/1986987.svg",
          title: "Intentos: " + this.intentos,
          text: "Tiempo" + this.min + ":" + this.seg,
          buttons: {
            reiniciar: {
              text: "Reiniciar",
            },
            home: {
              text: "Salir",
            },
          },
          closeOnClickOutside: false,
          allowOutsideClick: false,
        }).then((value) => {
          switch (value) {
            case "reiniciar":
              this.tiempo();
              this.reiniciarJuego();
              break;
            case "home":
              this.$router.push("/Categorias");
              break;
          }
        });
    },

    mezclarArreglo(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },
  },
};
</script>
