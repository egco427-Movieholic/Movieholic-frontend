<template>
  <div id="container" style="position:relative;"> 
  <p style="background-image: url('https://img5.goodfon.com/original/1920x1080/c/af/sssssss-aaaaaaaaaaa-ddddddddd-fffffffff-rrrrrrr.jpg');postition:absolute;margin:0px;padding:0px;height:100vh;filter:brightness(30%);background-size: auto;"></p>
  <img id="logo-signup" src='../assets/large_movieholic_resize.png' style="position:absolute;width: 35rem;top: 12%; left: 50%; transform: translate(-50%, -50%);">
    <sui-grid-column id="popup-window-signup" style="background-color:#1f1f1f;width: 35rem; position:absolute;top: 55%; left: 50%; transform: translate(-50%, -50%);padding:50px;">
      <sui-segment id="popup-detail-signup" raised style="background-color:#1f1f1f">
      <!-- <div class="ui black segment" style="background-color:#363636">
        <sui-label ribbon color="red" >Signin</sui-label>
      </div>   -->
      <h1 style="color:white; font-weight:bold">Create an account</h1>
      <br>
      <form class="ui form">
        <div class="field">
          <!-- <label style="color:crimson"><b>Username</b></label> -->
          <input type="text" v-model="User.username" placeholder="Username" style="padding: 20px;border-radius:10px;background-color:#363636;color:white">
        </div>
        <div class="field">
          <!-- <label style="color:crimson"><b>Email</b></label> -->
          <input type="text" v-model="User.email" placeholder="Email" style="padding: 20px;border-radius:10px;background-color:#363636;color:white">
        </div>
        <div class="field">
          <!-- <label style="color:crimson"><b>Password</b></label> -->
          <input type="text" v-model="User.password" placeholder="Password" style="padding: 20px;border-radius:10px;background-color:#363636;color:white">
        </div>
        <div class="field">
          <!-- <label style="color:crimson"><b>Confirm Password</b></label> -->
          <input type="text" v-model="User.password" placeholder="Confirm Password" style="padding: 20px;border-radius:10px;background-color:#363636;color:white">
        </div>
        <div class="field">
          <!-- <label style="color:crimson"><b>Confirm Password</b></label> -->
          <input type="text" v-model="User.image" placeholder="ImageUrl" style="padding: 20px;border-radius:10px;background-color:#363636;color:white">
        </div>
        <br><br>
        <button class="ui button" type="submit" @click.prevent="signUp" style="background-color:crimson; color:white;box-shadow:3px 3px #a7112f; width:100%;font-size:20px">
          Confirm
        </button>
        <br>
        <router-link to="/loginpage"> 
          <button class="ui button" type="submit" style="background-color:#e3e3e3; color:black;box-shadow:3px 3px #a8a8a8; width:100%;font-size:20px;margin-top:10px">
            Already have an account
          </button>
        </router-link>
      </form>

      </sui-segment>
    </sui-grid-column>
  </div>
</template>

<script>
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'

export default {
  name: 'signUpPage',
  data(){
    return{
      User: {
        username: '',
        email: '',
        password: '',
        image:"",
      }
    }
  },
  methods: {
    signUp(){
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.User.email, this.User.password)
      .then((user) =>{

        updateProfile(auth.currentUser, {displayName: this.User.username, photoURL:this.User.image})
      //  updateProfile(auth.currentUser, {photoURL: this.User.image})
        console.log(auth.currentUser)
      this.$router.replace('/signupsuccess')

      })
      .catch((error)=>{
        alert(error.message)
      })
    },
  }
}
</script>

<style>

#popup-window-signup{
  animation: popup-window-signup 0.5s ease forwards;
}

@keyframes popup-window-signup {
  0%{left:30%;opacity: 0;}
  30%{opacity: 0;}
  100%{margin:auto;opacity: 1;}
}

</style>