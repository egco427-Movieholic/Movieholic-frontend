<template>
    <navbar/>
    <sui-segment inverted>

        <div class="row" id='video'>
            <div class="col-sm-2"></div>
                <div class="col-sm-8">
                    <br>
                    <iframe width="1000" height="560" allow="fullscreen" :src="`${this.trailer}`"></iframe>
                    <br>
                </div>
            <div class="col-sm-2"></div>
        </div>

        <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-2" style="margin:auto" >
            <sui-image :src="`${this.image}`"/>
        </div>
        <div class="col-sm-6" style="padding:60px">
            <div class="row">
                
                <h1>
                    Title:  &nbsp;  {{this.detail.title}}
                    &nbsp;({{this.detail.year}})
                </h1>
                &nbsp;&nbsp;&nbsp;
                {{this.detail.genres}},
                {{this.detail.runtimeStr}}

            </div>
            <br>
            <div class="row">
                &nbsp;&nbsp;&nbsp;{{this.detail.plot}}
            </div>
            <br>
            <div class="row">
                Directors:  &nbsp;  {{this.detail.directors}}
            </div>
            <div class="row">
                Casts:  &nbsp;{{this.detail.stars}}
            </div>
            <br>
            <div class="row">
                 Award:  &nbsp;{{this.detail.awards}}
            </div>
            <br>
            <div class="row">
                IMDB Rating:  &nbsp;{{this.detail.imDbRating}}
            </div>
            <div class="row">
                 Metacritic Rating:  &nbsp;{{this.detail.metacriticRating}}
            </div>
            <div class="row">
                 Movie Holic Rating:  &nbsp;{{this.movieholicRating}}
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
                    <h2 style="margin:20px" v-if="!this.IsVoted" >Rate this movie</h2>
                    <sui-rating :defaultRating="0" :maxRating="10" v-model="this.newVote.score" color="red" v-if="!this.IsVoted" style="padding:0px 0px 20px 35px;display:block;margin-left:auto;margin-right:auto;"/>
                    <sui-button type="submit" @click="addVote" v-if="!this.IsVoted" style="display:block;margin-left:auto;margin-right:auto;background-color:crimson;width:90%;height:50px;border-radius:15px;">
                        Vote &nbsp;&nbsp;
                    </sui-button>
                    <br>
                    <input type="text" placeholder="description" v-model="this.newComment.text"  style="background-color:#fbd0d9;padding:10px;width:90%;height:100px;display:block;margin-left:auto;margin-right:auto;border-radius:15px;border-width:0px;">
                    <br>
                    <sui-button  type="submit" @click="addComment" style="display:block;margin-left:auto;margin-right:auto;background-color:crimson;width:90%;height:50px;border-radius:15px;">
                        Post Comment &nbsp;&nbsp;<sui-icon name="comment" />
                    </sui-button>
                    <br><br>
                </div>
                <br><br>
                <hr>
                <sui-comment v-for="(comment, key) in comments" :key='key'>
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
import navbar from './navbar.vue'
import axios from 'axios'
import { getAuth } from 'firebase/auth'

export default {
    name: 'movieDetail',
    components: {
        navbar
    },
    data(){
        return{      
            detail: '',
            image: '',
            trailer: '',
            comments: [],
            newComment: {
                postBy: "",
                text: "",
            },
            newVote: {
                voteBy: "",
                email: "",
                score: 0,
            },
            IsVoted: false,
            movieholicRating: ""
        }
    },
    mounted() {
        let auth = getAuth()
        this.newComment.postBy = auth.currentUser.displayName
        this.newVote.voteBy = auth.currentUser.displayName
        this.newVote.email = auth.currentUser.email

        //==========[Get Movie Detail]==========//
        axios.request('https://imdb-api.com/en/API/Title/k_59lwjr0e/' + this.$route.params.id)
        .then((response) => {
            this.image = response.data.image
            this.detail = response.data
            console.log(this.detail)
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Movie Trailer]==========//
        axios.request('https://imdb-api.com/en/API/YouTubeTrailer/k_59lwjr0e/' + this.$route.params.id)
        .then((response) => {
            this.trailer = response.data.videoUrl.replace('watch?v=','embed/')
            if(this.trailer == '')
            {
                document.getElementById('video').hidden = true
            }
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Get Movie Comments]==========//
        axios.get('http://localhost:5000/movieDetail/comment/' + this.$route.params.id)
        .then((response) => {
            this.comments = response.data.comments
        })
        .catch((error) => {
            console.log(error)
        })

        //==========[Check IsVoted?]=======//
        axios.get('http://localhost:5000/movieDetail/vote/' + this.$route.params.id + "/" + this.newVote.email)
        .then((response) => {
            if(JSON.stringify(response.data) != '{}')
            {
                this.IsVoted = true
            }
        })
        .catch((error) => {
                console.log(error)
        })

        //==========[Get Movie Votes]==========//
        axios.get('http://localhost:5000/movieDetail/vote/' + this.$route.params.id)
        .then((response) => {
            this.movieholicRating = response.data.averageVote
        })
        .catch((error) => {
            console.log(error)
        })
    },
    methods: {
        //==========[Add Movie Comment]==========//
        addComment() {
            axios.post('http://localhost:5000/movieDetail/comment/' + this.$route.params.id, this.newComment)
            .then((response) => {
                
            })
            .catch((error) => {
                console.log(error)
            })
           
           
            window.location.reload()
        },
        addVote() {
            if(!this.IsVoted){
               axios.post('http://localhost:5000/movieDetail/vote/' + this.$route.params.id, this.newVote)
                .then((response) => {
                    console.log(this.newVote)
                })
                .catch((error) => {
                    console.log(error)
                })
           
           }

           window.location.reload()
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
