<template>
   <navbar/>
    <sui-segment inverted style="margin-top:-20px">
 
        

        <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
            <sui-segment style="background-color:#a30f2d;width:100%;padding:10px;display:block;margin-left:auto;margin-right:auto;height:1000px">
                <br>
             <h1 style="text-align:center;">
                 <font face="Bedrock" size="10">Your Profile</font>
            </h1>
                <sui-image :src="`${this.image}`"/>
            <h3 >
                 <font face="Bedrock" size="7">Name : {{this.name}}</font>
            </h3>
            <h3 >
                 <font face="Bedrock" size="7">Email : {{this.email}}</font>
            </h3>
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
    name: 'Profile',
    components: {
        navbar
    },
    data(){
        return{      
           profile:{},
           email:"",
           name:"",
           image: ""
        }
    },
    mounted() {
        let auth = getAuth()
        this.profile  = getAuth()
        this.name = auth.currentUser.displayName
        this.email = auth.currentUser.email
        this.image = auth.currentUser.providerData[0].photoURL
        
    },
    methods: {
        
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
