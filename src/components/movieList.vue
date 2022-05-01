<template>
    
    <navbar style="margin-top:0px" />

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


    <vueper-slides bullets-outside :dragging-distance="50">
      <vueper-slide v-for="(slide, i) in slides" :key="i" :video="slide.video" />
    </vueper-slides>


    <!---------- IN THEATER ---------->

    <br><br><br>

      <sui-label ribbon color="red" class="ribbon-head-theater"><font face="Bungee Inline" size="10">IN THEATER</font></sui-label>

    <br><br><br><br>

    <div id="carousel-coming">
      <Carousel :autoplay='4000' :settings="settings_theater" :breakpoints="breakpoints_theater">
        <Slide v-for="(movie, key) in inTheaterMovies" :key='key'>
          <div class="carousel__item">
            <sui-image :src="`${movie.image}`" height="600" />
            <br>
            <!-- <sui-card-content>
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
            </sui-card-content> -->
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

    <!---------- Coming Soon ---------->
    <br><br><br>

    <sui-label ribbon color="red" class="ribbon-head-coming"><font face="Bungee Inline" size="10">Coming Soon</font></sui-label>

    <br><br><br><br>

    <div id="carousel-coming">
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide v-for="(movie, key) in comingSoonMovies" :key='key'>
          <div class="carousel__item">
            <sui-image :src="`${movie.image}`" height="600" />
            <br>
            <br>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
      <!-- <br><br> -->
    </div>

    <br><br><br>


    
    <sui-label ribbon color="red" class="ribbon-head"><font face="Bungee Inline" size="10">TOP 20</font></sui-label>

    <br><br><br><br><br>

    <div style="margin:0px 50px">
      <sui-card-group :itemsPerRow="4" doubling>
        <sui-card class="card-size" v-for="(movie, key) in top20Movies" :key='key' style="background-color:#000000">
          <sui-image  class="card-img-top" v-bind:src="movie.image" />

           <div class="card-body">
          <sui-card-content>
            <font face="Aldrich" size=" 5">
              <sui-card-header textAlign="center" style="color:crimson"> {{movie.title}}
              </sui-card-header>
            </font>

            <sui-card-meta style="text-align:center">

              <font face="Krona One" size=" 3">
                <sui-card-description>
                  <span style="color:white"><strong>Rank </strong>: {{movie.rank}} </span><br>
                </sui-card-description>
              </font>

            </sui-card-meta>

          </sui-card-content>
          </div>


          <div class="card-footer" style="background-color:white">
            <center>
              <router-link :to="{path: 'moviedetail', name: 'movieDetail', params:{id:movie.id}}" style="text-decoration: none; color: inherit;">
                <sui-button attached="bottom" type="submit" id="saveButton" basic color="black" >
                                <sui-icon name="info circle icon" />Detail
                </sui-button>
              </router-link>
            </center>
          </div>
          </sui-card>
          </sui-card-group>
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
  import {
    VueperSlides,
    VueperSlide
  } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'

  export default {

    name: "movieList",
    components: {
      Carousel,
      Slide,
      Navigation,
      navbar,
      VueperSlides,
      VueperSlide,

    },
    data() {
      return {
        searchWord: '',
        currentPopularMovieVideo: '',
        top20Movies: [],
        inTheaterMovies: [],
        comingSoonMovies: [],
        slides: [{
          title: '',
          content: '',
          image: '',
          video: {
            url: '',
            props: {
              allow: 'autoplay;'
            }
          }
        }, ],
        settings: {
          itemsToShow: 3,
          // snapAlign: 'center',
        },
        // breakpoints are mobile first
        // any settings not specified will fallback to the carousel settings
        breakpoints: {
          // 700px and up
          300: {
            itemsToShow: 1,
            // snapAlign: 'center',
          },
          550: {
            itemsToShow: 2,
            // snapAlign: 'center',
          },
          700: {
            itemsToShow: 3,
            // snapAlign: 'center',
          },
          // 1024 and up
          1024: {
            itemsToShow: 3,
            // snapAlign: 'start',
          },
        },
        settings_theater:{
          itemsToShow: 3,
        },
        breakpoints_theater: {
          // 700px and up
          300: {
            itemsToShow: 1,
            // snapAlign: 'center',
          },
          550: {
            itemsToShow: 2,
            // snapAlign: 'center',
          },
          // 700px and up
          700: {
            itemsToShow: 3,
            // snapAlign: 'center',
          }
        }
      }
    },
    mounted() {
      //==========[Get Current Popular movies]==========//
      axios.request('https://imdb-api.com/en/API/MostPopularMovies/k_59lwjr0e')
        .then((response1) => {

          //==========[Get only Top 1 Video]==========//
          axios.request('https://imdb-api.com/en/API/YouTubeTrailer/k_59lwjr0e/' + response1.data.items[0].id)
            .then((response2) => {
              this.slides[0].video.url = response2.data.videoUrl.replace('watch?v=', 'embed/')
            })
            .catch((error2) => {
              console.log(error2)
            })

        })
        .catch((error1) => {
          console.log(error1);
        })


      //==========[Get top 250 movies]==========//
      axios.request('https://imdb-api.com/en/API/Top250Movies/k_59lwjr0e')
        .then((response) => {

          //==========[Get only first 20 from 250]==========//
          this.top20Movies = response.data.items.slice(0, 20)

          for (var i = 0; i < 20; i++) {
            this.top20Movies[i].image = this.top20Movies[i].image.split("._")[0] + '._V1_AL_.jpg'
          }

        })
        .catch((error) => {
          console.log(error);
        })

      //==========[Get in theater movies]==========//
      axios.request('https://imdb-api.com/en/API/InTheaters/k_59lwjr0e')
        .then((response) => {
          this.inTheaterMovies = response.data.items.slice(0, 10)

          for (var i = 0; i < this.inTheaterMovies.length; i++) {
            this.inTheaterMovies[i].image = this.inTheaterMovies[i].image.split("._")[0] + '._V1_AL_.jpg'
          }
        })
        .catch((error) => {
          console.log(error)
        })

      //==========[Get coming soon movies]==========//
      axios.request('https://imdb-api.com/en/API/ComingSoon/k_59lwjr0e')
        .then((response) => {
          this.comingSoonMovies = response.data.items

          for (var i = 0; i < this.comingSoonMovies.length; i++) {
            this.comingSoonMovies[i].image = this.comingSoonMovies[i].image.split("._")[0] + '._V1_AL_.jpg'
          }
        })
        .catch((error) => {
          console.log(error)
        })

    },
    methods: {
      search() {
        if (this.searchWord != '') {
          this.$router.replace('/searchpage/' + this.searchWord)
        }
      },
    },
  }
</script>

<style>
  .card-img-top {
    width: 100%;
    height: 50vh;
    object-fit: cover;
  }

  .ribbon-head {
    width: 270px;
  }

  .ribbon-head-coming {
     width: 450px;
  }

  .ribbon-head-theater {
    width: 400px;
  }
  
</style>