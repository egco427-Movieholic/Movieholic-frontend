<template style="background-color : black">
<navbar style="margin-top:0px"/>
 <sui-segment inverted style="margin-top:-20px">


    <h1><font face = "Verdana" size = "8">Genre : "{{this.searchGenre}}"</font></h1>
    <br>

    <div class="ui four doubling cards">
        <sui-card v-for="(movie, key) in searchMovies" :key='key' style="background-color:black">

            <sui-image class="card-img-top" v-bind:src="movie.image" />

            <sui-card-content>
                <font face="Verdana" size=" 5">
                    <sui-card-header textAlign="center" style="color:crimson"> {{movie.title}} </sui-card-header>
                </font>

            </sui-card-content> 


           <div class="card-footer" style="background-color:white">

                    <router-link :to="{path: 'moviedetail', name: 'movieDetail', params: {id: movie.id}}" style="text-decoration: none; color: inherit;">
                        <center>
                            <sui-button attached="bottom" type="submit" id="saveButton" basic color="black">
                                <sui-icon name="info circle icon" />Detail
                            </sui-button>
                        </center>
                    </router-link>
                </div>
        </sui-card>
    </div>

    </sui-segment>

    <!------------ Footer Start ------------>
  <footer class="bg-dark text-center text-white" style="margin-top:-15px">
    <!------------ Copyright ------------>
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2022 Copyright:
      <a class="text-white">MovieHolic</a>
    </div>
    <!------------ End Copyright ------------>
  </footer>
  <!----------- -Footer End ------------>

</template>

<script>
import axios from 'axios'
import navbar from './navbar.vue'

export default {
    name: "searchGenre",
    components:{
        navbar
    },
    data() {
        return{
            searchMovies: [],
            searchGenre: '',
        }
    },
    mounted() {
        this.searchGenre = this.$route.params.genre
        this.search()
    },
    methods: {
        search() {
            this.$router.replace('/searchgenre/'+this.searchGenre)
            //==========[Get movies from genre]==========//
            axios.request('https://imdb-api.com/API/AdvancedSearch/k_59lwjr0e/?genres=' + this.searchGenre)
            .then((response) => {
                this.searchMovies = response.data.results
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        
    }
}
</script>

<style>
.card-img-top {
    width: 100%;
    height: 50vh;
    object-fit: cover;
}
.carousel__prev{
    color: black;
   width : 25px ;
   height: 25px;
    margin-left: 15px;
  box-sizing: content-box;
  background-color: cornsilk;
  border: 2px solid rgb(0, 0, 0);
}
.carousel__next {
  color: black;
   width : 25px ;
   height: 25px;
    margin-right: 15px;
  box-sizing: content-box;
  background-color: cornsilk;
  border: 2px solid rgb(0, 0, 0);
}
.carousel__slide > .carousel__item {
  transform: scale(1);
  opacity: 0.5;
  transition: 0.5s;
}
.carousel__slide--visible > .carousel__item {
  opacity: 1;
  transform: rotateY(0);
}
.carousel__slide--next > .carousel__item {
  transform: scale(0.9) translate(-10px);
}
.carousel__slide--prev > .carousel__item {
  transform: scale(0.9) translate(10px);
}
.carousel__slide--active > .carousel__item {
  transform: scale(1.1);
}
</style>