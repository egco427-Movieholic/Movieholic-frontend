<template>
    <div id="background" style="position:relative; height:100vh">
        <navbar/>
        <div id="container">
            <center>
                <div class="container" style="margin:18vh 25vw 0vh 25vw;background-color:#363636;width:auto;height:45vh;border-radius:80px">
                        <sui-label ribbon color="red" style="width:20vw;padding:15px;transform:translate(0, -50%); font-size:1.5em">Profile</sui-label>
                    <br>
                    <sui-image :src="`${this.image}`" style="width:15vw;height:auto; float:left;margin:0vh 5vh 0vh 5vh; border-radius:100%;background-color:#8c0d26;"/>
                    <div style="background-color:#8c0d26;margin-left:10vw;margin-right:3vw;margin-top:5vh;border-radius:25px">
                        <h2 style="color:white;font-size:2em;padding:3vh 0vw 0vh 0vw;text-align:left">Username : {{this.name}}</h2>
                        <hr style="color:white">
                        <h4 style="color:white;font: size 1.5em;padding:0vh 0vw 3vh 0vw;text-align:left">Email: {{this.email}}</h4>
                    </div>
                </div>
            </center>
        </div>
    </div>
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

    #background{
        background-image:url('../assets/mainbg.png');
    }

</style>
