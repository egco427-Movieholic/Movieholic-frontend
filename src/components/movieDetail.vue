<template>
    <sui-segment inverted>
    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <br>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/6hB3S9bIaco" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;display:block;margin-left:auto;margin-right:auto;"></iframe>
            <br>
        </div>
        <div class="col-sm-2"></div>
    </div>
        
    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-2" style="margin:auto" >
            <!-- <img src="https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6751_AL_.jpg" style="width:100%"/> -->
            <sui-image floated = "center" :src="`${this.movie.image}`" style="width:100%"/> 
        </div>
        <div class="col-sm-6" style="padding:60px">
            <div class="row">
                
                <h1>
                    Title:  &nbsp;  {{this.movie.title}}
                    <!-- The Shawshank Redemption -->
                    &nbsp;({{this.movie.year}})
                    <!-- &nbsp;(1994) -->
                </h1>
                &nbsp;&nbsp;&nbsp;
                {{this.movie.genres}},
                <!-- Drama, -->
                {{this.movie.runtimeStr}}
                <!-- 2h 22min -->
            </div>
            <br>
            <div class="row">
                &nbsp;&nbsp;&nbsp;{{this.movie.plot}}
               <!-- &nbsp;&nbsp;&nbsp;Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red. -->
            </div>
            <br>
            <div class="row">
                Directors:  &nbsp;  {{this.movie.directors}}
                <!-- Directors:   Frank Darabont -->
            </div>
            <div class="row">
                Casts:  &nbsp;{{this.movie.stars}}
                <!-- Casts:  Tim Robbins, Morgan Freeman, Bob Gunton -->
            </div>
            <br>
            <div class="row">
                 Award:  &nbsp;{{this.movie.awards}}
                 <!-- Award:  Top rated movie #1 | Nominated for 7 Oscars, 21 wins & 43 nominations total -->
            </div>
            <br>
            <div class="row">
                IMDB Rating:  &nbsp;{{this.movie.imDbRating}}
                <!-- IMDB Rating:  9.3 -->
            </div>
            <div class="row">
                 Metacritic Rating:  &nbsp;{{this.movie.metacriticRating}}
                <!-- Metacritic Rating:  81 -->
            </div>
            <br>
        </div>
        <div class="col-sm-2"></div>  
    </div> 

    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <sui-segment style="background-color:#363636">
                <br><br>
                <div style="background-color:#a30f2d;width:50%;padding:10px;display:block;margin-left:auto;margin-right:auto;">
                    <h2 style="margin:20px">Rate this movie</h2>
                    <sui-rating :defaultRating="0" :maxRating="10" color="red" style="padding:0px 0px 20px 35px;display:block;margin-left:auto;margin-right:auto;"/>
                    <input type="text" placeholder="description" v-model="this.newComment.text"  style="background-color:#fbd0d9;padding:10px;width:90%;height:100px;display:block;margin-left:auto;margin-right:auto;border-radius:15px;border-width:0px;">
                    <br>
                    <sui-button  type="submit" @click="addComment" style="display:block;margin-left:auto;margin-right:auto;background-color:crimson;width:90%;height:50px;border-radius:15px;">
                        Post Comment &nbsp;&nbsp;<sui-icon name="comment" />
                    </sui-button>
                    <br><br>
                </div>
                <br><br>
                <hr>
                <sui-comment v-for="(comment, key) in currentComments" :key='key'>
                <!--<sui-comment-avatar src="/images/avatar/small/matt.jpg" />-->
                    <sui-comment-content style="background-color:crimson;padding:20px;border-radius:15px;margin:20px">
                        <sui-comment-author >Post By : {{comment.postBy}} &nbsp;&nbsp;&nbsp;{{comment.postTime}}</sui-comment-author>
                        <sui-comment-text>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{comment.text}}
                        </sui-comment-text>
                    </sui-comment-content>
                </sui-comment>
            </sui-segment> 
        </div>
        <div class="col-sm-2"></div>
    </div>
    <br>
    
</sui-segment>
</template>

<script>
import axios from 'axios'
import { getAuth } from 'firebase/auth'

export default {
    name: 'movieDetail',
    data(){
        return{      
            movie_id: this.$route.params.movie_id,
            movie: {},
            currentComments: [],
            newComment: {
                postBy: "",
                text: "",
            }
        }  
    },
    mounted(){
        //==========[Get Username]==========//
        let auth = getAuth()
        this.newComment.postBy = auth.currentUser.displayName

        //==========[Get Movie Detail]==========//
        axios.request('https://imdb-api.com/en/API/Title/k_59lwjr0e/' + this.movie_id)
        .then((response) => {
            this.movie = response.data
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Movie Comments]==========//
        axios.get('http://localhost:5000/movieDetail/comment/' + this.movie_id)
        .then((response) => {
            console.log(response.data.comments)
            this.currentComments = response.data.comments
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Movie Trailer]==========//
        axios.request('https://imdb-api.com/API/Trailer/k_59lwjr0e/' + this.movie_id)
        .then((response) => {
            this.movie = response.data
        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods: {

        //==========[Add Movie Comment]==========//
        addComment(){
            axios.post('http://localhost:5000/movieDetail/comment/' + this.movie_id, this.newComment)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

            window.location.reload()
        }
    }
    

}
</script>

<style>
.row {
  display: flex;
}

.column {
    margin-left: 50px;
  flex: 33.33%;
  padding: 5px;
}
#innerbox
{
   width:250px; /* or whatever width you want. */
   max-width:400px; /* or whatever width you want. */
   display: inline-block;
}
</style>