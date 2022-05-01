<template>
    <div id="background" style="position:relative;">
        <div style="margin-top:-20px"/>
            <navbar/>
        
        <div style="background-color:#363636;margin-left:20vw;margin-right:20vw;width:60vw">
            <div class="col-sm-8">
                <iframe allow="fullscreen" :src="`${this.trailer}`" style="width:60vw;height:70vh"></iframe>
            </div>

            <div style="width:20vw;height:50vh;float:left; margin:3vh 0.5vw 2vh 2vw" >
                <sui-image :src="`${this.image}`"/>
            </div>
            <div style="width:60vw;height:35vw;padding-top:5vh;padding-left:25vw;padding-right:2vw;background-color:#363636;color:white">
                <div class="row">
                    <strong style="font-size:1.75vw">
                        {{this.detail.title}}
                        ({{this.detail.year}})
                    </strong>
                    <strong style="font-size: 1vw;">
                    &nbsp;{{this.detail.genres}},
                    {{this.detail.runtimeStr}}
                    </strong>
                </div>
                <br>
                <div class="row" style="font-size:1vw">
                    &nbsp;&nbsp;&nbsp;{{this.detail.plot}}
                </div>
                <br>
                <div class="row" style="font-size:1vw">
                    Directors: {{this.detail.directors}}
                </div>
                <div class="row" style="font-size:1vw">
                    Casts: {{this.detail.stars}}
                </div>
                <br>
                <div class="row" style="font-size:1vw">
                    Award: {{this.detail.awards}}
                </div>
            </div>
            <div style="width:100%;height:30vh;background-color:#8c0d26">
                <div class="row" style="margin:auto;">
                    <div class="col-sm-4" style="width:12vw;height:12vw; background-color:crimson;border-radius:100%;margin-top:3.25vh;margin-left:6vw;border:solid gold">
                        <center>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' style="width:6vw;margin-top:6vh" > <br>
                            <strong style="color:gold;font-size:2.2vw;">{{this.detail.imDbRating}}/10</strong>
                        </center>
                    </div>
                    <div class="col-sm-4" style="width:12vw;height:12vw; background-color:crimson;border-radius:100%;margin-top:3.25vh;margin-left:6vw;border:solid gold">
                        <center>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/4/48/Metacritic_logo.svg' style="width:10vw;margin-top:7vh"  > <br>
                            <strong style="color:gold;font-size:2.2vw;">{{this.detail.metacriticRating}}/100</strong>
                        </center>
                    </div>
                    <div class="col-sm-4" style="width:12vw;height:12vw; background-color:crimson;border-radius:100%;margin-top:3.25vh;margin-left:6vw;border:solid gold">
                        <center>
                            <img src='../assets/large_movieholic_resize.png' style="width:10vw;margin-top:6vh" > <br>
                            <strong style="color:gold;font-size:2.2vw;">{{this.movieholicRating}}/10</strong>
                        </center>
                    </div>
                </div>
            </div>
            <div v-if="!this.IsVoted" style="background-color:#8c0d26;width:40vw;margin-left:10vw;margin-right:10vw;margin-top:5vh">
                <h2 style="padding:3vh 3vw 0vh 3vw; color:white;font-weight:bold" v-if="!this.IsVoted" >Rate this movie</h2>
                <center>
                    <sui-rating :defaultRating="0" :maxRating="10" v-model="this.newCommentAndVote.score" color="yellow" v-if="!this.IsVoted" style="width:20vw;margin:5vh"/>
                </center>
                <input type="text" placeholder="Review" v-model="this.newCommentAndVote.text" v-if="!this.IsVoted" style="background-color:#fbd0d9;padding:10px;width:30vw;height:100px;margin:1vh 5vw 1vh 5vw;border-radius:15px;border-width:0px;">
                <br>
                <sui-button  type="submit" @click="addReview" v-if="!this.IsVoted" style="margin:3vh 5vw 3vh 5vw;background-color:crimson;width:30vw;height:50px;border-radius:15px;">
                    Post Review &nbsp;&nbsp;<sui-icon name="comment" />
                </sui-button>
            </div>
            <hr v-if="!this.IsVoted">
            <sui-comment v-for="(review, key) in currentCommentAndVote" :key='key' style="background-color:#8c0d26;padding:3vh">
                <sui-comment-content style="background-color:#363636;padding:20px;border-radius:15px;color:white">
                    <sui-comment-author >
                        <strong>
                            {{review.postBy}}
                        </strong>
                        <i style="float:right">{{review.postTime}}</i>
                        <br>
                        Score: {{review.score || "0"}}
                        <br>
                    </sui-comment-author>
                    <sui-comment-text style="margin-top:1vh">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{review.text}}
                    </sui-comment-text>
                </sui-comment-content>
            </sui-comment>
        </div>
    </div>

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
import { getAuth } from 'firebase/auth'

export default {
    name: 'movieDetail',
    components: {
        navbar
    },
    data(){
        return{      
            movie_id: this.$route.params.id,
            detail: {},
            trailer: "",
            image: "",
            currentCommentAndVote: [],
            movieholicRating: 0,
            newCommentAndVote: {
                postBy: "",
                score: "",
                email: "",
                text: "",
            },
            IsVoted: false
        }  
    },
    mounted(){
        //==========[Get Username And Email]==========//
        let auth = getAuth()
        this.newCommentAndVote.postBy = auth.currentUser.displayName
        this.newCommentAndVote.email = auth.currentUser.email

        //==========[Get Movie Trailer]==========//
        axios.request('https://imdb-api.com/en/API/YouTubeTrailer/k_59lwjr0e/' + this.$route.params.id)
        .then((response) => {
            this.trailer = response.data.videoUrl.replace('watch?v=', 'embed/')
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Movie Detail]==========//
        axios.request('https://imdb-api.com/en/API/Title/k_59lwjr0e/' + this.$route.params.id)
        .then((response) => {
            this.detail = response.data
            this.image = response.data.image
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Movie Comments]==========//
        axios.get('https://movieholic-backend.herokuapp.com/movieDetail/commentAndVote/' + this.$route.params.id)
        .then((response) => {
            this.currentCommentAndVote = response.data.commentAndVote
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Average Score]==========//
        axios.request('https://movieholic-backend.herokuapp.com/movieDetail/averageRating/' + this.$route.params.id)
        .then((response) => {
            this.movieholicRating = response.data.averageVote
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get User Vote]==========//
        axios.request('https://movieholic-backend.herokuapp.com/movieDetail/checkUserVote/' + this.$route.params.id + '/' + this.newCommentAndVote.email)
        .then((response) => {
            this.IsVoted = response.data.IsVoted
        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods: {
        //==========[Add Movie Review]==========//
        addReview(){

            if(!this.IsVoted){
                axios.post('https://movieholic-backend.herokuapp.com/movieDetail/commentAndVote/' + this.$route.params.id, this.newCommentAndVote)
                .then((response) => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
           }
        }
    }

}
</script>

<style>
    #background{
        background-image:url('../assets/mainbg.png');
    }
</style>
