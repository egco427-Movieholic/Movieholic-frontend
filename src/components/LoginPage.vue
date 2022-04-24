<template>
<div id="container" style="position:relative;"> 
  <p style="background-image: url('https://img5.goodfon.com/original/1920x1080/c/af/sssssss-aaaaaaaaaaa-ddddddddd-fffffffff-rrrrrrr.jpg');postition:absolute;margin:0px;padding:0px;height:100vh;filter:brightness(50%);background-repeat: repeat-y;"></p>
  <img src='../assets/large_movieholic_resize.png' style="position:absolute;width: 35rem;top: 12%; left: 50%; transform: translate(-50%, -50%);">
    <sui-grid-column style="width: 35rem;margin:auto; background-color:#1f1f1f; position:absolute;width: 35rem;top: 55%; left: 50%; transform: translate(-50%, -50%);padding:50px;">
      <sui-segment raised style="background-color:#1f1f1f">
      <!-- <div class="ui black segment" style="background-color:#363636">
        <sui-label ribbon color="red" >Signin</sui-label>
      </div>   -->
      <h1 style="color:white; font-weight:bold">Sign In</h1>
      <br>
      <form class="ui form">
        <div class="field">
          <!-- <label style="color:crimson"><b>User Account</b></label> -->
          <input type="text" v-model="User.email" placeholder="Email" style="padding: 20px;border-radius:25px;background-color:#363636;color:white">
        </div>
        <div class="field">
          <input type="password" v-model="User.password" placeholder="Password" style="padding: 20px;border-radius:25px; background-color:#363636; color:white">
          <div class="ui pointing red basic label" id = "errorDisplay" hidden = "true"></div>
        </div>
        <br><br>
        <button class="ui button" type="submit" @click.prevent="signIn" style="background-color:crimson; color:white;box-shadow:3px 3px #a7112f; width:100%;font-size:20px">
          Signin
        </button>
        <br>
        <button class="ui button" type="submit" @click.prevent="signInGoogle" style="background-color:#e3e3e3; color:black;box-shadow:3px 3px #a8a8a8; width:100%;font-size:20px;margin-top:10px">
          Sign in via
          <img src='../assets/google_PNG19644.png' style="width:30%;margin-top:-7px;margin-bottom:-10px">
        </button>
        <br><br>
        <hr style="color:white">
        <br>
        <button class="ui button" type="submit" @click="signUp" style="background-color:crimson; color:white;box-shadow:3px 3px #a7112f; width:100%;font-size:20px">
          Create an account
        </button>
      </form>

      </sui-segment>
    </sui-grid-column>
  </div>


</template>

<script>
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
export default {
    name: 'SignIn',
    data(){
      return{
        User: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
        signIn(){
            const auth = getAuth()
            signInWithEmailAndPassword(auth, this.User.email, this.User.password)
            .then((user) =>{
                this.$router.replace('/movielist')
            })
            .catch((error)=>{
                alert(error.message)
            })
        },
        signUp(){
          this.$router.replace('/signuppage')
        },
        signInGoogle () {
            const provider = new GoogleAuthProvider()
            const auth = getAuth()
            signInWithPopup(auth, provider)
            .then((result)=>{
                //const credential = GoogleAuthProvider.credentialFromResult(result)
                //const token = credential.accessToken
                //const user = result.user
                this.$router.replace('/movielist')
            })
            .catch((error)=>{
                alert(error.message)
            })
        }
    },
}
</script>

<style>

</style>