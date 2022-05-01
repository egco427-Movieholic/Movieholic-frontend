<template>
    <div id="background" style="position:relative;">
        <div style="margin-top:-20px"/>
            <navbar/>
        
        <div style="background-color:#363636;margin-left:20vw;margin-right:20vw;width:60vw">
            <div class="col-sm-8">
                <iframe allow="fullscreen" :src="`${this.trailer}`" style="width:60vw;height:70vh"></iframe>
            </div>

            <div style="width:40vh;height:50vh;float:left; margin:3vh 0.5vw 2vh 2vw" >
                <sui-image :src="`${this.image}`"/>
            </div>
            <div style="width:60vw;height:65vh;padding-top:5vh;padding-left:25vw;padding-right:2vw;background-color:#363636;color:white">
                <div class="row">
                    <p style="font-size:1.75em">
                        {{this.detail.title}}
                        ({{this.detail.year}})
                    </p>
                    &nbsp;&nbsp;
                    {{this.detail.genres}},
                    {{this.detail.runtimeStr}}
                </div>
                <br>
                <div class="row">
                    &nbsp;&nbsp;&nbsp;{{this.detail.plot}}
                </div>
                <br>
                <div class="row">
                    Directors: {{this.detail.directors}}
                </div>
                <div class="row">
                    Casts: {{this.detail.stars}}
                </div>
                <br>
                <div class="row">
                    Award: {{this.detail.awards}}
                </div>
            </div>
            <div style="width:100%;height:30vh;background-color:#8c0d26">
                <div class="row">
                    <div class="col-sm-4" style="width:20vw">
                        <center>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg' style="width:10vw;margin-top:6vh" > <br>
                            <strong style="color:gold;font-size:3em;">{{this.detail.imDbRating}}/10</strong>
                        </center>
                    </div>
                    <div class="col-sm-4" style="width:20vw">
                        <center>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/4/48/Metacritic_logo.svg' style="width:18vw;margin-top:7vh"  > <br>
                            <strong style="color:gold;font-size:3em;">{{this.detail.metacriticRating}}/100</strong>
                        </center>
                    </div>
                    <div class="col-sm-4" style="width:20vw">
                        <center>
                            <img src='../assets/large_movieholic_resize.png' style="width:18vw;margin-top:5.5vh" > <br>
                            <strong style="color:gold;font-size:3em;">{{this.movieholicRating}}/10</strong>
                        </center>
                    </div>
                </div>
            </div>
            <div v-if="!this.IsVoted" style="background-color:#8c0d26;width:40vw;margin-left:10vw;margin-right:10vw;margin-top:5vh">
                <h2 style="padding:3vh 3vw 0vh 3vw; color:white" v-if="!this.IsVoted" >Rate this movie</h2>
                <center>
                    <sui-rating :defaultRating="0" :maxRating="10" v-model="this.newCommentAndVote.score" color="red" v-if="!this.IsVoted" style="width:20vw;margin:5vh"/>
                </center>
                <input type="text" placeholder="Review" v-model="this.newCommentAndVote.text" v-if="!this.IsVoted" style="background-color:#fbd0d9;padding:10px;width:30vw;height:100px;margin:1vh 5vw 1vh 5vw;border-radius:15px;border-width:0px;">
                <br>
                <sui-button  type="submit" @click="addReview" v-if="!this.IsVoted" style="margin:3vh 5vw 3vh 5vw;background-color:crimson;width:30vw;height:50px;border-radius:15px;">
                    Post Review &nbsp;&nbsp;<sui-icon name="comment" />
                </sui-button>
            </div>
            <hr>
            <sui-comment v-for="(review, key) in currentCommentAndVote" :key='key'>
                <sui-comment-content style="background-color:crimson;padding:20px;border-radius:15px;margin:20px">
                    <sui-comment-author >Review By : {{review.postBy}} &nbsp;&nbsp;&nbsp;{{review.postTime}} &nbsp;&nbsp;&nbsp; Score: {{review.score}}</sui-comment-author>
                    <sui-comment-text>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{review.text}}
                    </sui-comment-text>
                </sui-comment-content>
            </sui-comment>
        </div>
    </div>
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
        axios.get('http://localhost:5000/movieDetail/commentAndVote/' + this.$route.params.id)
        .then((response) => {
            this.currentCommentAndVote = response.data.commentAndVote
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Average Score]==========//
        axios.request('http://localhost:5000/movieDetail/averageRating/' + this.$route.params.id)
        .then((response) => {
            this.movieholicRating = response.data.averageVote
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get User Vote]==========//
        axios.request('http://localhost:5000/movieDetail/checkUserVote/' + this.$route.params.id + '/' + this.newCommentAndVote.email)
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
                axios.post('http://localhost:5000/movieDetail/commentAndVote/' + this.$route.params.id, this.newCommentAndVote)
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
