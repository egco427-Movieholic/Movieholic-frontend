<template style="background-color : black">

<navbar />
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

    <h1><font face = "Verdana" size = "8">Search : "{{this.$route.params.title}}"</font></h1>
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
import axios from 'axios'
import navbar from './navbar.vue'

export default {
    name: "searchPage",
    components:{
        navbar
    },
    data() {
        return{
            searchWord: '',
            searchMovies: [],
        }
    },
    mounted() {
        this.searchWord = this.$route.params.title
        this.search()
    },
    methods: {
        search(){
            if(this.searchWord == '')
            {
                this.$router.replace('/movielist')
            }
            else
            {
                this.$router.replace('/searchpage/' + this.searchWord)
            }
            
            //==========[Get movies from name]==========//
            axios.request('https://imdb-api.com/en/API/SearchMovie/k_59lwjr0e/' + this.searchWord)
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

