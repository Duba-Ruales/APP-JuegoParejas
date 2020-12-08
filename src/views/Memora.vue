<template>
  <div class="header fondo1">
    <div class="header-body row sinpadding mb-1 fondo2">
      <div class="col">
        <h2 class="text-context text-white">{{ categoria }}</h2>
        <button class="btton-pause" @click="pause()">
          <img class="img-btn" src="../assets/fondo/pause.png" alt="Pause" />
        </button>
        <div class="flex-items">
          <div class="h5 text-white">Intentos: {{ intentos }}</div>
          <div class="h5 text-white">Aciertos: {{ aciertos }}</div>
          <div>
            <span class="h5 text-white">Tiempo: </span>
            <span class="h5 text-white" id="minutos"></span>
            <b class="text-white"> : </b>
            <span class="h5 text-white" id="segundos"></span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(fila, indiceFila) in memorama"
      :key="indiceFila"
      class="row sinpadding"
    >
      <div
        :key="indiceFila + '' + indiceImagen"
        class="col imagen-print"
        v-for="(imagen, indiceImagen) in fila"
      >
        <div class="mb-1">
          <img
            @click="voltear(indiceFila, indiceImagen)"
            :class="{ girar: imagen.mostrar }"
            :src="imagen.mostrar ? imagen.ruta : NOMBRE_IMAGEN_OCULTA"
            class="target-image card-img-top img-fluid"
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
      dibujos: [],
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
      this.logos = [
        "https://cdn.pixabay.com/photo/2014/04/02/10/56/recycling-304974__340.png",
        "https://cdn.pixabay.com/photo/2016/11/09/08/58/wordpress-1810632__340.jpg",
        "https://cdn.pixabay.com/photo/2013/07/13/11/34/wifi-158401__340.png",
        "https://cdn.pixabay.com/photo/2016/04/24/14/34/youtube-1349699__340.png",
        "https://cdn.pixabay.com/photo/2016/11/09/10/42/facebook-1811267_960_720.jpg",
        "https://cdn.pixabay.com/photo/2014/04/03/00/43/lion-309219__340.png",
        "https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309__340.png",
        "https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266__340.jpg",
        "https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908__340.png",
        "https://cdn.pixabay.com/photo/2016/01/26/17/15/gmail-1162901__340.png",
        "https://cdn.pixabay.com/photo/2016/11/04/14/13/google-maps-1797882__340.png",
        "https://cdn.pixabay.com/photo/2017/01/16/17/05/whatsapp-1984584__340.png",
        "https://cdn.pixabay.com/photo/2016/08/15/18/18/bmw-1596080__340.png",
        "https://cdn.pixabay.com/photo/2015/08/27/11/20/bitcoin-910307__340.png",
        "https://cdn.pixabay.com/photo/2018/08/30/16/57/coffee-3642712__340.png",
        "https://cdn.pixabay.com/photo/2015/09/15/21/26/cat-941821__340.png",
        "https://cdn.pixabay.com/photo/2014/04/02/10/16/firefox-303322__340.png",
        "https://cdn.pixabay.com/photo/2016/12/23/07/00/game-1926905__340.png",
        "https://cdn.pixabay.com/photo/2014/04/02/10/56/recycling-304974__340.png",
        "https://cdn.pixabay.com/photo/2016/11/09/08/58/wordpress-1810632__340.jpg",
        "https://cdn.pixabay.com/photo/2013/07/13/11/34/wifi-158401__340.png",
        "https://cdn.pixabay.com/photo/2016/04/24/14/34/youtube-1349699__340.png",
        "https://cdn.pixabay.com/photo/2016/11/09/10/42/facebook-1811267_960_720.jpg_",
        "https://cdn.pixabay.com/photo/2014/04/03/00/43/lion-309219__340.png",
        "https://cdn.pixabay.com/photo/2014/04/02/10/16/fire-303309__340.png",
        "https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266__340.jpg",
        "https://cdn.pixabay.com/photo/2016/04/13/14/27/google-chrome-1326908__340.png",
        "https://cdn.pixabay.com/photo/2016/01/26/17/15/gmail-1162901__340.png",
        "https://cdn.pixabay.com/photo/2016/11/04/14/13/google-maps-1797882__340.png",
        "https://cdn.pixabay.com/photo/2017/01/16/17/05/whatsapp-1984584__340.png",
        "https://cdn.pixabay.com/photo/2016/08/15/18/18/bmw-1596080__340.png",
        "https://cdn.pixabay.com/photo/2015/08/27/11/20/bitcoin-910307__340.png",
        "https://cdn.pixabay.com/photo/2018/08/30/16/57/coffee-3642712__340.png",
        "https://cdn.pixabay.com/photo/2015/09/15/21/26/cat-941821__340.png",
        "https://cdn.pixabay.com/photo/2014/04/02/10/16/firefox-303322__340.png",
        "https://cdn.pixabay.com/photo/2016/12/23/07/00/game-1926905__340.png",
      ];
      this.dibujos = [
        "https://cdn.pixabay.com/photo/2018/03/31/03/46/kitten-3277268__340.png",
        "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195__340.png",
        "https://cdn.pixabay.com/photo/2016/11/01/18/41/alien-1789184__340.png",
        "https://cdn.pixabay.com/photo/2020/01/30/08/00/caricature-4804615__340.jpg",
        "https://cdn.pixabay.com/photo/2017/03/29/12/52/bear-2185131__340.png",
        "https://cdn.pixabay.com/photo/2018/02/02/00/32/robot-3124412__340.jpg",
        "https://cdn.pixabay.com/photo/2017/09/14/11/36/doctor-2748707__340.png",
        "https://cdn.pixabay.com/photo/2017/03/19/00/48/dog-2155329__340.png",
        "https://cdn.pixabay.com/photo/2018/02/12/22/19/ice-cream-3149270__340.jpg",
        "https://cdn.pixabay.com/photo/2018/03/12/00/13/caricature-3218433__340.png",
        "https://cdn.pixabay.com/photo/2018/02/27/13/27/bima-3185441__340.png",
        "https://cdn.pixabay.com/photo/2020/01/30/07/57/caricature-4804606__340.jpg",
        "https://cdn.pixabay.com/photo/2019/07/15/01/15/fish-4338388__340.png",
        "https://cdn.pixabay.com/photo/2019/07/15/01/15/fish-4338388__340.png",
        "https://cdn.pixabay.com/photo/2015/08/02/23/32/african-872377__340.png",
        "https://cdn.pixabay.com/photo/2020/01/30/07/58/caricature-4804608__340.jpg",
        "https://cdn.pixabay.com/photo/2018/08/23/23/15/einstein-3626977__340.png",
        "https://cdn.pixabay.com/photo/2016/03/31/20/40/annoying-1295960__340.png",
        "https://cdn.pixabay.com/photo/2018/03/31/03/46/kitten-3277268__340.png",
        "https://cdn.pixabay.com/photo/2017/01/31/20/53/robot-2027195__340.png",
        "https://cdn.pixabay.com/photo/2016/11/01/18/41/alien-1789184__340.png",
        "https://cdn.pixabay.com/photo/2020/01/30/08/00/caricature-4804615__340.jpg",
        "https://cdn.pixabay.com/photo/2017/03/29/12/52/bear-2185131__340.png",
        "https://cdn.pixabay.com/photo/2018/02/02/00/32/robot-3124412__340.jpg",
        "https://cdn.pixabay.com/photo/2017/09/14/11/36/doctor-2748707__340.png",
        "https://cdn.pixabay.com/photo/2017/03/19/00/48/dog-2155329__340.png",
        "https://cdn.pixabay.com/photo/2018/02/12/22/19/ice-cream-3149270__340.jpg",
        "https://cdn.pixabay.com/photo/2018/03/12/00/13/caricature-3218433__340.png",
        "https://cdn.pixabay.com/photo/2018/02/27/13/27/bima-3185441__340.png",
        "https://cdn.pixabay.com/photo/2020/01/30/07/57/caricature-4804606__340.jpg",
        "https://cdn.pixabay.com/photo/2019/07/15/01/15/fish-4338388__340.png",
        "https://cdn.pixabay.com/photo/2019/07/15/01/15/fish-4338388__340.png",
        "https://cdn.pixabay.com/photo/2015/08/02/23/32/african-872377__340.png",
        "https://cdn.pixabay.com/photo/2020/01/30/07/58/caricature-4804608__340.jpg",
        "https://cdn.pixabay.com/photo/2018/08/23/23/15/einstein-3626977__340.png",
        "https://cdn.pixabay.com/photo/2016/03/31/20/40/annoying-1295960__340.png",
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
        case "logos":
          this.imagenes = this.logos;
          break;
        case "dibujos":
          this.imagenes = this.dibujos;
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
        icon:
          "https://runfrictionless.com/wp-content/uploads/2018/10/trophy-200px.gif",
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
<style>
.header {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 100px auto;
}
.sinpadding {
  margin: 0;
  padding: 0;
}
.col {
  width: 99%;
  height: 99%;
  margin: auto;
  position: relative;
}
.target-image {
  width: 99%;
  position: relative;
  height: calc(100% - 100px);
}
.imagen-print img {
  position: absolute;
  height: 99%;
  width: 99%;
  top: 0px;
  left: 0px;
  padding: 0px 2px;
}
.header-body {
  text-align: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  height: auto;
}
.flex-items {
  display: flex;
  justify-content: space-evenly;
}
.swal-modal {
  background-color: rgb(76, 215, 250);
  border: 3px solid rgb(255, 255, 255);
}
.swal-title {
  margin: 0px;
  font-size: 18px;
  margin-bottom: 28px;
  color: #000;
  text-transform: uppercase;
}
.swal-icon {
  height: 40%;
  width: 40%;
}
.swal-text {
  color: black;
}
.swal-footer {
  background-color: rgb(76, 215, 250);
  overflow: hidden;
  text-align: center;
  border-top: none;
}
.swal-button {
  padding: 10px 19px;
  border-radius: 5px;
  font-size: 12px;
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
  color: rgb(255, 255, 255);
}
.swal-button--reiniciar {
  background-color: #c0be4f;
}
.swal-button--home {
  background-color: #c0be4f;
}
</style>