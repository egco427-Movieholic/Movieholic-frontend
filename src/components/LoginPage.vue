<template>
<div id="container" style="position:relative;"> 
  <p style="background-image: url('https://img5.goodfon.com/original/1920x1080/c/af/sssssss-aaaaaaaaaaa-ddddddddd-fffffffff-rrrrrrr.jpg');postition:absolute;margin:0px;padding:0px;height:100vh;filter:brightness(30%);background-size: auto;"></p>
  <img id="logo" src='../assets/large_movieholic_resize.png' style="position:absolute;width: 35rem;">
    <sui-grid-column id="popup-window" style="background-color:#1f1f1f; position:absolute;top: 55%; left: 50%; transform: translate(-50%, -50%);padding:50px;">
      <sui-segment id="popup-detail" raised style="background-color:#1f1f1f">
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
          <img src='../assets/google_PNG19644.png' style="width:30%;margin-top:-15px;margin-bottom:-10px">
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
import {getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence} from 'firebase/auth'
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
            setPersistence(auth, browserSessionPersistence)
             .then(() => {
               signInWithEmailAndPassword(auth, this.User.email, this.User.password)
               .then((user) => {
                 this.$router.replace('/movielist')
               })
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        },
        signUp(){
          this.$router.replace('/signuppage')
        },
        signInGoogle () {
            const provider = new GoogleAuthProvider()
            const auth = getAuth()
            signInWithPopup(auth, provider)
            .then((result)=>{
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
#logo{
  animation: logo 4s ease forwards;
}

#popup-window{
  animation: popup-window 5s ease forwards;
}

#popup-detail{
  animation: popup-detail 6s ease forwards;
}

@keyframes logo {
  0%{top: 50%; left: 50%; transform: translate(-50%, -50%);width: 0rem;}
  10%{top: 50%; left: 50%; transform: translate(-50%, -50%);width: 35rem;}
  30%{top: 50%; left: 50%; transform: translate(-50%, -50%);}
  100%{top: 12%; left: 50%; transform: translate(-50%, -50%);}
}

@keyframes popup-window {
  0%{width: 0%;margin:0;opacity: 0;}
  50%{width: 0%;margin:0;opacity: 0;}
  70%{opacity: 0;}
  100%{width: 35rem;margin:auto;opacity: 1;}
}

@keyframes popup-detail {
  0%{opacity: 0;}
  70%{opacity: 0;}
  100%{opacity: 1;}
}
</style>