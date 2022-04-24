<template style="background-color : black">
    
    <navbar msg="Welcome to Your Vue.js" />
    <sui-segment inverted style="margin-top:-20px">
        <!-- Search -->

        <div class="ui segment" style="background-color : black">
            <div class="input-group">
                <sui-label ribbon color="red">Movies</sui-label>
                <input type="text" class="form-control" placeholder="Search..." v-model="this.searchWord">
                <div>

                    <sui-button @click="search()" color="red" attached="left">Search</sui-button>

                </div>
            </div>
        </div>

        <br>
        <h1 style="text-align:center;">
            <font face="Bedrock" size="10">IN THEATER</font>
        </h1>
        <!-- <br> -->

        <div>
            <Carousel :settings="settings" :breakpoints="breakpoints">
                <Slide v-for="(movie, key) in inTheaterMovies" :key='key' >
                    <div class="carousel__item">
                        <sui-image :src="`${movie.image}`"/>
                        <!-- ถ้าเป็นรูปเล็กเปิดใช้งานอันนี้ -->
                        <!-- <sui-image :src="`${movie.image}`" style="width:100%" /> -->
                        <br>
                        <sui-card-content>
                            <sui-card-header textAlign="center" style="font-size:40px; color:crimson">{{movie.title}}
                            </sui-card-header>
                            <sui-card-description>
                                <sui-card-meta>
                                    <font face="Comic sans MS" size=" 5">
                                        <span><strong style="color:crimson">Genres</strong> :
                                            {{movie.genres}}</span><br>
                                        <span><strong style="color:crimson">Release State</strong> :
                                            {{movie.releaseState}}</span><br>
                                    </font>
                                </sui-card-meta>
                            </sui-card-description>
                        </sui-card-content>
                        <br>
                    </div>
                </Slide>

                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
            <!-- <br><br> -->
        </div>
        <!-- <br><br><br><br> -->

        <h1 style="text-align:center;">
            <font face="Bedrock" size="10">TOP 20</font>
        </h1>
        <!-- <br>
        <br> -->


        <div style="margin:0px 50px">
            <div class="ui four doubling cards">

                <sui-card v-for="(movie, key) in popularMovies" :key='key' style="background-color:#000000">

                    <sui-image class="card-img-top" v-bind:src="movie.image"/>

                    <sui-card-content>
                        <font face="Verdana" size=" 5">
                            <sui-card-header textAlign="center" style="color:crimson"> {{movie.title}}
                            </sui-card-header>
                        </font>

                        <sui-card-meta style="text-align:center">

                            <font face="Comic sans MS" size=" 4">
                                <sui-card-description>
                                    <span style="color:white"><strong>Year </strong>: {{movie.year}} </span><br>
                                    <span style="color:white"><strong>Rank </strong>: {{movie.rank}} </span><br>
                                    <span style="color:white"><strong>Rating </strong>: {{movie.imDbRating}} </span><br>
                                </sui-card-description>
                            </font>

                        </sui-card-meta>

                    </sui-card-content>

                    <div class="card-footer" style="background-color:white">

                        <router-link :to="{path: 'moviedetail', name: 'movieDetail', params: {movie_id: movie.id}}">
                            <center>
                                <sui-button attached="bottom" type="submit" id="saveButton" basic color="black">
                                    <sui-icon name="info circle icon" />Detail
                                </sui-button>
                            </center>
                        </router-link>
                    </div>
                </sui-card>
            </div>
        </div>
    </sui-segment>




    <!--Footer Start-->
    <footer class="bg-dark text-center text-white" style="margin-top:-15px">
        <!-- Copyright -->
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            © 2020 Copyright:
            <a class="text-white">MovieHolic</a>
        </div>
        <!-- End Copyright -->
    </footer>
    <!--Footer End-->




</template>

<script>
    import navbar from './navbar.vue'

    import axios from 'axios'
    import {
        getAuth
    } from 'firebase/auth'

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
            navbar
        },
        data() {
            return {
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
                        itemsToShow: 1,
                        snapAlign: 'center',
                    },
                    // 1024 and up
                    1024: {
                        itemsToShow: 1,
                        snapAlign: 'start',
                    },
                },
            }
        },
        mounted() {
            //==========[Get top 250 movies]==========//
            axios.request('https://imdb-api.com/en/API/Top250Movies/k_59lwjr0e')
                .then((response) => {

                    //==========[Get only first 20 from 250]==========//
                    this.popularMovies = response.data.items.slice(0, 20)

                })
                .catch((error) => {
                    console.log(error);
                })

            //==========[Get in theater movies]==========//
            axios.request('https://imdb-api.com/en/API/InTheaters/k_59lwjr0e')
                .then((response) => {
                    this.inTheaterMovies = response.data.items.slice(0, 10)
                })

        },
        methods: {
            search() {
                this.$router.replace('/searchpage/' + this.searchWord)
            }
        },
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

    .carousel__prev {
        color: black;
        width: 25px;
        height: 25px;
        margin-left: 15px;
        box-sizing: content-box;
        background-color: cornsilk;
        border: 2px solid rgb(0, 0, 0);
    }

    .carousel__next {
        color: black;
        width: 25px;
        height: 25px;
        margin-right: 15px;
        box-sizing: content-box;
        background-color: cornsilk;
        border: 2px solid rgb(0, 0, 0);
    }

    .carousel__slide>.carousel__item {
        transform: scale(1);
        opacity: 0.5;
        transition: 0.5s;
    }

    .carousel__slide--visible>.carousel__item {
        opacity: 1;
        transform: rotateY(0);
    }

    .carousel__slide--next>.carousel__item {
        transform: scale(0.9) translate(-10px);
    }

    .carousel__slide--prev>.carousel__item {
        transform: scale(0.9) translate(10px);
    }

    .carousel__slide--active>.carousel__item {
        transform: scale(1.1);
    }
</style>