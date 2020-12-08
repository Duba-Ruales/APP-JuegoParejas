<template>
  <div class="bttn2 padre fondo1">
    <div class="prueba fondo2">
      <div class="col-12">
        <h2 class="text-context">MEMORY MATCH</h2>
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
        <div class="mb-1 prueba">
          <img
            @click="voltear(indiceFila, indiceImagen)"
            :class="{ girar: imagen.mostrar }"
            :src="imagen.mostrar ? imagen.ruta : NOMBRE_IMAGEN_OCULTA"
            class="target-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import React from "react";
var cronometro;
var ganador = "¡ FELICIDADES !";
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
      logos: [],
      columnas: 0,
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
      esperandoTimeout: false,
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
        (this.columnas = parseInt(localStorage.getItem("ancho")));
      this.alto = parseInt(localStorage.getItem("alto"));
      this.ciclo = this.alto * this.columnas;
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

      this.musica = [
        "https://cdn.pixabay.com/photo/2014/10/13/17/49/acoustic-guitar-487035__340.jpg",
        "https://cdn.pixabay.com/photo/2017/10/04/18/39/cello-2817159__340.jpg",
        "https://cdn.pixabay.com/photo/2014/06/04/17/53/piano-362251__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/01/18/18/guitar-2276181__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/19/21/55/guitar-2963955__340.jpg",
        "https://cdn.pixabay.com/photo/2014/01/17/09/57/drums-246840__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/07/00/18/guitar-2925274__340.jpg",
        "https://cdn.pixabay.com/photo/2010/12/13/10/01/guitar-2119__340.jpg",
        "https://cdn.pixabay.com/photo/2014/06/04/17/53/piano-362251__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/01/18/18/guitar-2276181__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/19/21/55/guitar-2963955__340.jpg",
        "https://cdn.pixabay.com/photo/2014/01/17/09/57/drums-246840__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/07/00/18/guitar-2925274__340.jpg",
        "https://cdn.pixabay.com/photo/2010/12/13/10/01/guitar-2119__340.jpg",
        "https://cdn.pixabay.com/photo/2014/06/04/17/53/piano-362251__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/01/18/18/guitar-2276181__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/19/21/55/guitar-2963955__340.jpg",
        "https://cdn.pixabay.com/photo/2014/01/17/09/57/drums-246840__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/07/00/18/guitar-2925274__340.jpg",
        "https://cdn.pixabay.com/photo/2010/12/13/10/01/guitar-2119__340.jpg",
        "https://cdn.pixabay.com/photo/2014/06/04/17/53/piano-362251__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/01/18/18/guitar-2276181__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/19/21/55/guitar-2963955__340.jpg",
        "https://cdn.pixabay.com/photo/2014/01/17/09/57/drums-246840__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/07/00/18/guitar-2925274__340.jpg",
        "https://cdn.pixabay.com/photo/2010/12/13/10/01/guitar-2119__340.jpg",
        "https://cdn.pixabay.com/photo/2014/06/04/17/53/piano-362251__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/01/18/18/guitar-2276181__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/19/21/55/guitar-2963955__340.jpg",
        "https://cdn.pixabay.com/photo/2014/01/17/09/57/drums-246840__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/07/00/18/guitar-2925274__340.jpg",
        "https://cdn.pixabay.com/photo/2010/12/13/10/01/guitar-2119__340.jpg",
        "https://cdn.pixabay.com/photo/2014/06/04/17/53/piano-362251__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/01/18/18/guitar-2276181__340.jpg",
        "https://cdn.pixabay.com/photo/2017/11/19/21/55/guitar-2963955__340.jpg",
        "https://cdn.pixabay.com/photo/2014/01/17/09/57/drums-246840__340.jpg",
      ];
      this.vehiculos = [
        "https://cdn.pixabay.com/photo/2019/07/07/14/03/fiat-4322521_960_720.jpg",
        "https://cdn.pixabay.com/photo/2017/01/06/05/28/car-1957037__340.jpg",
        "https://cdn.pixabay.com/photo/2016/09/11/16/47/ifa-1661767__340.jpg",
        "https://cdn.pixabay.com/photo/2015/05/15/14/46/bmw-768688__340.jpg",
        "https://cdn.pixabay.com/photo/2016/03/09/15/11/rusted-1246518__340.jpg",
        "https://cdn.pixabay.com/photo/2015/12/08/00/28/car-1081742__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/29/10/01/vw-bully-1868890__340.jpg",
        "https://cdn.pixabay.com/photo/2020/10/18/16/45/porsche-5665390__340.jpg",
        "https://cdn.pixabay.com/photo/2016/03/09/09/23/car-1245780__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/21/18/07/automotive-1846910__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/21/30/bike-1836962__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/22/23/55/automobile-1851299__340.jpg",
        "https://cdn.pixabay.com/photo/2020/06/22/19/30/automobile-5330343__340.jpg",
        "https://cdn.pixabay.com/photo/2017/09/07/16/39/vehicle-2725880__340.png",
        "https://cdn.pixabay.com/photo/2016/04/13/21/58/auto-1327801__340.jpg",
        "https://cdn.pixabay.com/photo/2016/11/06/05/33/miniature-1802333__340.jpg",
        "https://cdn.pixabay.com/photo/2019/08/14/19/00/auto-4406505__340.jpg",
        "https://cdn.pixabay.com/photo/2018/10/26/22/55/harley-davidson-3775527__340.jpg",
        "https://cdn.pixabay.com/photo/2018/03/23/09/15/chevrolet-3253172__340.png",
        "https://cdn.pixabay.com/photo/2018/08/04/16/26/vw-bulli-3583964__340.png",
        "https://cdn.pixabay.com/photo/2018/04/11/15/37/vehicle-3310787__340.png",
        "https://cdn.pixabay.com/photo/2017/09/06/17/08/bmw-2722258__340.png",
        "https://cdn.pixabay.com/photo/2016/10/20/06/00/fiat-1754723__340.jpg",
        "https://cdn.pixabay.com/photo/2017/09/10/13/26/isolated-2735568__340.png",
        "https://cdn.pixabay.com/photo/2017/09/09/10/45/model-car-2731660__340.png",
        "https://cdn.pixabay.com/photo/2015/05/30/21/43/capri-790722__340.jpg",
        "https://cdn.pixabay.com/photo/2013/03/11/12/44/bmw-92442__340.jpg",
        "https://cdn.pixabay.com/photo/2020/03/10/23/17/vw-bus-4920544__340.png",
        "https://cdn.pixabay.com/photo/2019/10/19/19/15/motorcycle-4562069__340.jpg",
        "https://cdn.pixabay.com/photo/2019/04/08/21/46/harley-davidson-4113065__340.jpg",
        "https://cdn.pixabay.com/photo/2018/10/29/19/09/scooter-3781795__340.jpg",
        "https://cdn.pixabay.com/photo/2018/03/25/10/37/t-model-3259027__340.png",
        "https://cdn.pixabay.com/photo/2015/06/22/08/11/auto-817343__340.jpg",
        "https://cdn.pixabay.com/photo/2015/11/16/15/57/fire-1045906__340.jpg",
        "https://cdn.pixabay.com/photo/2020/11/14/14/12/car-5741871__340.jpg",
        "https://cdn.pixabay.com/photo/2020/11/09/12/15/car-5726522__340.jpg",
      ];

      this.animales = [
        "https://cdn.pixabay.com/photo/2018/08/12/16/59/ara-3601194__340.jpg",
        "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg",
        "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247__340.jpg",
        "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588__340.jpg",
        "https://cdn.pixabay.com/photo/2014/11/03/17/40/leopard-515509__340.jpg",
        "https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777__340.jpg",
        "https://cdn.pixabay.com/photo/2013/06/29/21/18/wolf-142173__340.jpg",
        "https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314__340.jpg",
        "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg",
        "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374__340.jpg",
        "https://cdn.pixabay.com/photo/2018/08/12/16/59/ara-3601194__340.jpg",
        "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg",
        "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247__340.jpg",
        "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588__340.jpg",
        "https://cdn.pixabay.com/photo/2014/11/03/17/40/leopard-515509__340.jpg",
        "https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777__340.jpg",
        "https://cdn.pixabay.com/photo/2013/06/29/21/18/wolf-142173__340.jpg",
        "https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314__340.jpg",
        "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg",
        "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374__340.jpg",
        "https://cdn.pixabay.com/photo/2018/08/12/16/59/ara-3601194__340.jpg",
        "https://cdn.pixabay.com/photo/2012/06/19/10/32/owl-50267__340.jpg",
        "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg",
        "https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247__340.jpg",
        "https://cdn.pixabay.com/photo/2013/11/01/11/13/dolphin-203875__340.jpg",
        "https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588__340.jpg",
        "https://cdn.pixabay.com/photo/2014/11/03/17/40/leopard-515509__340.jpg",
        "https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777__340.jpg",
        "https://cdn.pixabay.com/photo/2013/06/29/21/18/wolf-142173__340.jpg",
        "https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314__340.jpg",
        "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg",
        "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374__340.jpg",
      ];
      this.logos = [""];

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
      var self = this;
      let st = this.seg;
      let mt = this.min;
      let ht = this.horas;
      let segundo = document.getElementById("segundos");
      let minuto = document.getElementById("minutos");
      (minuto.innerHTML = mt),
        (segundo.innerHTML = st),
        (cronometro = setInterval(function () {
          if (st === 60) {
            mt++;
            st = 0;
            minuto.innerHTML = mt;
            if (mt === 60) {
              mt = 0;
              ht++;
            }
          }
          st++;
          segundo.innerHTML = st;
          self.guardartiempo();
        }, 1000));
    },

    guardartiempo() {
      if (this.seg === 60) {
        this.seg = 0;
        this.min++;
        if (this.min === 60) {
          this.min = 0;
          this.horas++;
        }
      }
      this.seg++;
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
      for (let i = 0; i < this.ciclo; i += this.columnas) {
        memoramaDividido.push(memorama.slice(i, i + this.columnas));
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

    //juego en pausa intermediarios
    pause() {
      clearInterval(cronometro);
      swal({
        ganador,
        icon:
          "https://pauseonline.s3.eu-west-2.amazonaws.com/wp-content/uploads/2019/11/01131317/Pause-Logo.png",

        text: "ACIERTOS: " + "[ " + this.aciertos + " ]",

        buttons: {
          reanudar: {
            text: "REANUDAR",
          },
          home: {
            text: "INICIO ",
          },
        },
        closeOnClickOutside: false,
        allowOutsideClick: false,
      }).then((value) => {
        switch (value) {
          case "reanudar":
            this.tiempo();
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
      swal({
        icon: "https://www.flaticon.es/svg/static/icons/svg/1986/1986987.svg",
        title: "INTENTOS FALLIDOS: " + "[ " + this.intentos + " ]",
        text: "TIEMPO:  " + this.min + ":" + this.seg,
        buttons: {
          reiniciar: {
            text: "REINICIAR",
          },
          home: {
            text: "INICIO ",
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
