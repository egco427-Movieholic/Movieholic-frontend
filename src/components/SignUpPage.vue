<template>
  <div id="background"  style="position:relative; height:100vh"> 
    <div class="row">
      <center>
        <img src='../assets/large_movieholic_resize.png' style="margin-top:5vh;width:50vh">
      </center>
    </div>
    <center>
      <sui-grid-column id="popup-window-signup" style="background-color:#1f1f1f;width:60vh;margin-top:5vh">
        <sui-segment id="popup-detail-signup" raised style="background-color:#1f1f1f">
          <h2 style="color:white; font-weight:bold;text-align:left;margin:0.4em 0.5em">Create an account</h2>
          <form class="ui form" style="padding:3vh">
            <div class="field">
              <!-- <label style="color:crimson"><b>Username</b></label> -->
              <input type="text" v-model="User.username" placeholder="Username" style="padding: 1em;border-radius:10px;background-color:#363636;color:white">
            </div>
            <div class="field">
              <!-- <label style="color:crimson"><b>Email</b></label> -->
              <input type="text" v-model="User.email" placeholder="Email" style="padding: 1em;border-radius:10px;background-color:#363636;color:white">
            </div>
            <div class="field">
              <!-- <label style="color:crimson"><b>Password</b></label> -->
              <input type="text" v-model="User.password" placeholder="Password" style="padding: 1em;border-radius:10px;background-color:#363636;color:white">
            </div>
            <div class="field">
              <!-- <label style="color:crimson"><b>Confirm Password</b></label> -->
              <input type="text" v-model="User.password" placeholder="Confirm Password" style="padding: 1em;border-radius:10px;background-color:#363636;color:white">
            </div>
            <div class="field">
              <!-- <label style="color:crimson"><b>Confirm Password</b></label> -->
              <input type="text" v-model="User.image" placeholder="ImageUrl" style="padding: 1em;border-radius:10px;background-color:#363636;color:white">
            </div>
            <button class="ui button" type="submit" @click.prevent="signUp" style="background-color:crimson; color:white;box-shadow:3px 3px #a7112f; width:100%;font-size:18px">
              Confirm
            </button>
            <br>
            <router-link to="/loginpage"> 
              <button class="ui button" type="submit" style="background-color:#e3e3e3; color:black;box-shadow:3px 3px #a8a8a8; width:100%;font-size:18px;margin-top:10px">
                Already have an account
              </button>
            </router-link>
          </form>

        </sui-segment>
      </sui-grid-column>
    </center>
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
        image: ''
      }
    }
  },
  methods: {
    signUp(){
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.User.email, this.User.password)
      .then((user) =>{

        updateProfile(auth.currentUser, {displayName: this.User.username, photoURL: this.User.image})
        console.log(auth)
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

#background{
  background-image:url('../assets/mainbg.png');
}

#popup-window-signup{
  animation: popup-window-signup 0.5s ease forwards;
}

@keyframes popup-window-signup {
  0%{margin-left:-5vh ;opacity: 0;}
}

</style>