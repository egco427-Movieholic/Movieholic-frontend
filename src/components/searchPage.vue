<template>
 <sui-segment>
  <div class="ui segment" style="background-color : black">
            <div class="input-group">
                <sui-label ribbon color="orange">Movies</sui-label>
                <input type="text" class="form-control" placeholder="Search..." v-model="this.searchWord">
                <div>
                        <sui-button @click="search()" color="yellow" attached="left">Search</sui-button>
                </div>
            </div>
        </div>

    <h1>Search : "{{this.$route.params.title}}"</h1>
    <sui-card-group :itemsPerRow="4" doubling v-for="(movie, key) in searchMovies" :key='key'>
    <!-- <sui-card v-for = "movie_alias in filterContacts" v-bind:key = "movie_alias.name"> -->
    <!-- <sui-image class="card-img-top"  v-bind:src = "movie_alias.imageUrl" /> -->
    <sui-card>
        <sui-image :src="`${movie.image}`" />
    <sui-card-content >
        <sui-card-header textAlign="center">{{movie.title}} </sui-card-header>
        <sui-card-description >
            <sui-card-meta >    
            </sui-card-meta>  
        </sui-card-description >   

    </sui-card-content >    

            
    <div style  = "text-align: center">
            <router-link :to ="{path: 'moviedetail', name: 'movieDetail', params: {movie_id: movie.id}}">
                <sui-button floated="center" color = "blue" >
                        Detail
                </sui-button>
            </router-link>
           

    </div >
    <br>
    </sui-card>
    
    <!-- </sui-card>  -->
       
    </sui-card-group>
    </sui-segment>
</template>

<script>
import axios from 'axios'

export default {
    name: "searchPage",
    data() {
        return{
            searchWord: '',
            searchMovies: []
        }
    },
    mounted() {
        this.searchWord = this.$route.params.title

        axios.request('https://imdb-api.com/en/API/SearchMovie/k_agfqs4x6/' + this.searchWord)
        .then((response) => {
            this.searchMovies = response.data.results
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods: {
        search(){
            this.$router.replace('/searchpage/'+this.searchWord)

            axios.request('https://imdb-api.com/en/API/SearchMovie/k_agfqs4x6/' + this.searchWord)
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