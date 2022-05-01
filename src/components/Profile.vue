<template>
    <div style="margin-top:20px">
        <div id="background" style="position:relative; height:100vh">
            <navbar/>
            <div id="container" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-40%);background-color:#363636; width: 60vw; border: solid gold; border-radius:70px">
                <!-- <sui-label ribbon color="red" style="width:20vw;padding:15px;transform:translate(0, -50%); font-size:1.5em">Profile</sui-label> -->
                <br>
                <div class="row" style="margin:auto">
                    <div class="col-sm-1"></div>
                    <div class="col-sm-4" style="margin-bottom:2vw;margin-top:0vh">
                        <sui-image :src="`${this.image}`" style="width:15vw;height:15vw;border-radius:100%;background-color:#8c0d26;border:solid gold"/>
                    </div>
                    <div class="col-sm-6" style="background-color:#8c0d26;margin-top:4%;height:100%;border-radius:25px;border:solid gold">
                        <h2 style="color:white;font-size:2vw;padding:3vh 0vw 0vh 0vw;text-align:left">Username : {{this.name}}</h2>
                        <hr style="color:white">
                        <h2 style="color:white;font-size: 2vw;padding:0vh 0vw 3vh 0vw;text-align:left">Email: {{this.email}}</h2>
                    </div>
                    <div class="col-sm-1"></div>
                </div>
            </div>
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

        console.log(auth)

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
