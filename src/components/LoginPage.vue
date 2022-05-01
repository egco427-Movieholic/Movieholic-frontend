<template>
<div id="background" style="position:relative;height:100vh"> 
  <div class="row">
    <center>
      <img id="logo" src='../assets/large_movieholic_resize.png' style="margin-top:5vh;width:50vh">
    </center>
  </div>
    <center>
      <sui-grid-column id="popup-window" style="background-color:#1f1f1f;width:50vh;margin-top:5vh">
        <sui-segment id="popup-detail" raised style="background-color:#1f1f1f">
        <h1 style="color:white; font-weight:bold;text-align:left;margin:0.4em 0.5em">Sign In</h1>
        <form class="ui form" style="padding:2em">
          <div class="field">
            <input type="text" v-model="User.email" placeholder="Email" style="padding: 1.25em;border-radius:25px;background-color:#363636;color:white">
          </div>
          <div class="field">
            <input type="password" v-model="User.password" placeholder="Password" style="padding: 1.25em;border-radius:25px; background-color:#363636; color:white">
            <div class="ui pointing red basic label" id = "errorDisplay" hidden = "true"></div>
          </div>
          <button class="ui button" type="submit" @click.prevent="signIn" style="background-color:crimson; color:white;box-shadow:3px 3px #a7112f; width:90%;font-size:18px;margin-top:0.5em">
            Sign in
          </button>
          <button class="ui button" type="submit" @click.prevent="signInGoogle" style="background-color:#e3e3e3; color:black;box-shadow:3px 3px #a8a8a8; width:90%;font-size:18px;margin-top:10px;margin-bottom:0.5em">
            Sign in via
            <img src='../assets/google_PNG19644.png' style="width:4em;margin-top:-15px;margin-bottom:-10px">
          </button>
          <hr style="color:white">
          <button class="ui button" type="submit" @click="signUp" style="background-color:crimson; color:white;box-shadow:3px 3px #a7112f; width:90%;font-size:18px">
            Create an account
          </button>
        </form>
        </sui-segment>
      </sui-grid-column>
    </center>
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
               .catch((error1) => {
                 alert(error1)
               })
            })
            .catch((error2) => {
                alert(error2)
            });
            // signInWithEmailAndPassword(auth, this.User.email, this.User.password)
            // .then((user) =>{
            //     this.$router.replace('/movielist')
            // })
            // .catch((error)=>{
            //     alert(error.message)
            // })
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
#background{
  background-image:url('../assets/mainbg.png');
}

#logo{
  animation: logo 4s ease forwards;
}

@keyframes logo {
  0%{width: 0vh;margin-top: 40vh ;}
  50%{width: 50vh;margin-top: 40vh ;}
}

#popup-window{
  animation: popup-window 5s ease forwards;
}

@keyframes popup-window {
  0%{opacity: 0;height: 0vh;margin-top: 0vh;}
  70%{opacity: 0;height: 0vh;margin-top: 0vh;}

}
</style>