<template>
    <div class="categorias padre fondo2">
        <div class="bloque">

            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='animales'" @click="siguiente()"><h5><img src="https://beagleboard.org/static/Drivers/Windows/src/files/beagle.ico" width="42">  ANIMALES</h5></button>
            </div>


            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='frutas'" @click="siguiente()"><h5><img src="https://image.flaticon.com/icons/png/128/3082/3082025.png" width="42">  FRUTAS </h5></button>
            </div>
            

            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='musica'" @click="siguiente()"><h5><img src="https://arigar.com/wp-content/uploads/2017/06/favicon-music.png" width="42">  MÚSICA</h5></button>
            </div>


            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" v-on:click="cat='vehiculos'" @click="siguiente()"><h5><img src="https://image.flaticon.com/icons/png/512/513/513885.png" width="42">   VEÍCULOS</h5></button>
            </div>




<!-- v-on:click="cat='marcas'" @click="siguiente()" -->
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" ><h5><img src="https://n-bici.com/wp-content/uploads/2016/05/cropped-favicon.png" width="42">   LOGOTIPOS</h5></button>
            </div>


            <!-- v-on:click="cat='NO'" @click="siguiente()" -->
            <div class="bloques">
                <button class="bttn bttn-cat fondo1" type="submit" ><h5> <img src="https://www.defensorianinez.cl/wp-content/uploads/2018/08/favicon.png" width="42">  DIBUJOS</h5></button>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'Categorias',
    data(){
        return{
            cat: '',
        }
    },
    mounted(){
        localStorage.removeItem("categoria")
    },
    methods: {
        siguiente(){
            localStorage.setItem('categoria', this.cat);
            this.$router.push("/Cuadriculas")
        }
    }
}

</script>