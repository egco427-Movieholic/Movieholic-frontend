<template>

<div class="card mx-auto" style="width: 35rem;" >
  <sui-grid-column>
    <sui-segment raised>

      <div class="ui teal segment">
         <sui-label ribbon color="teal">Login</sui-label>
      </div>
      
      <form class="ui form">
        <div class="field">
          <label><b>User Account</b></label>
             <input type="text" v-model="User.email" placeholder="User Account">
        </div>

        <div class="field">
          <label><b>Password</b></label>
            <input type="password" v-model="User.password" placeholder="Password">
            <div class="ui pointing red basic label" id = "errorDisplay" hidden = "true"></div>
        </div>
 
            <button class="ui button" type="submit" @click.prevent="signIn">Login</button>
            <button class="ui button" type="submit" @click="signUp">Sign Up</button>
            <button class="ui button" type="submit" @click.prevent="signInGoogle">Sign in with Google</button>
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