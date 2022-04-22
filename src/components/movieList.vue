<template style="background-color : black">

<sui-segment >
<!-- Search -->

        <div class="ui segment" style="background-color : black">
            <div class="input-group">
                <sui-label ribbon color="orange">Movies</sui-label>
                <input type="text" class="form-control" placeholder="Search..." v-model="this.searchWord">
                <div>
                    
                    <sui-button @click="search()" color="yellow" attached="left">Search</sui-button>
                    
                </div>
            </div>
        </div>

        <br>
        <h1>IN Theater</h1>
        <br>
        <div>
            <Carousel :settings="settings" :breakpoints="breakpoints">
                <Slide v-for="(movie, key) in inTheaterMovies" :key='key'>
                    <div class="carousel__item">
                        <sui-image :src="`${movie.image}`" />
                        <br>
                        <sui-card-content>
                            <sui-card-description>
                                <sui-card-meta>
                                    <span class="date">Genres : {{movie.genres}}</span><br>
                                    <span class="date">Release State : {{movie.releaseState}}</span><br>
                                </sui-card-meta>
                            </sui-card-description>
                            <sui-card-header textAlign="center">{{movie.title}} </sui-card-header>

                        </sui-card-content>
                        <br>
                    </div>
                </Slide>

                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
            <br><br>
        </div>
<br><br><br><br>

<h1>TOP 10</h1>
<sui-card-group :itemsPerRow="4" doubling v-for="(movie, key) in popularMovies" :key='key'>
    <!-- <sui-card v-for = "movie_alias in filterContacts" v-bind:key = "movie_alias.name"> -->
    <!-- <sui-image class="card-img-top"  v-bind:src = "movie_alias.imageUrl" /> -->
    <sui-card>
        <sui-image :src="`${movie.image}`" />
    <sui-card-content >
        <sui-card-header textAlign="center">{{movie.title}} </sui-card-header>
        <sui-card-description >
            <sui-card-meta >    
            <span class="date">Year : {{movie.year}}</span><br>
            <span class="date">Rank : {{movie.rank}}</span><br>
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
import { getAuth } from 'firebase/auth'

import {
        Carousel,
        Navigation,
        Slide
} from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default {

    name: "movieList",
    components: {
            Carousel,
            Slide,
            Navigation,
        },
    data(){
        return{
            searchWord: '',
            popularMovies: [],
            inTheaterMovies: [],

            settings: {
                    itemsToShow: 1,
                    snapAlign: 'center',
            },
            // breakpoints are mobile first
            // any settings not specified will fallback to the carousel settings
            breakpoints: {
                // 700px and up
                700: {
                    itemsToShow: 3.5,
                    snapAlign: 'center',
                },
                // 1024 and up
                1024: {
                    itemsToShow: 5,
                    snapAlign: 'start',
                },
            },
        }  
    },
    mounted() {
        axios.request('https://imdb-api.com/en/API/Top250Movies/k_agfqs4x6')
        .then((response) => {
            
            this.popularMovies = response.data.items.slice(0,10)

        })
        .catch((error) => {
	        console.log(error);
        })
        
        axios.request('https://imdb-api.com/en/API/InTheaters/k_agfqs4x6')
        .then((response) => {
            this.inTheaterMovies = response.data.items.slice(0,10)
        })
       
    },methods: {
        search(){
            this.$router.replace('/searchpage/'+this.searchWord)
        }
    },
    computed:{
        // filterContacts : function(){
        //     return this.movie.filter((contact)=>{
        //         return contact.firstname.toLowerCase().match(this.search.toLowerCase()) || contact.lastname.toLowerCase().match(this.search.toLowerCase()) ||  (contact.firstname +" "+contact.lastname).toLowerCase().match(this.search.toLowerCase())
        //     })
        // }
    }
}
</script>
   
<style>
.card-img-top {
    width: 100%;
    height: 50vh;
    object-fit: cover;
}
.carouselprev--in-active,
.carouselnext--in-active {
  display: none;
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