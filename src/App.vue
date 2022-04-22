<template>
  
  <sui-segment inverted>
  <div class="ui stackable orange inverted menu">
      
      <sui-menu-item ><img src="https://www.pngarts.com/files/8/Confused-Anime-PNG-Free-Download.png" alt=""></sui-menu-item>
      <router-link to ="/movielist" >
      <sui-menu-item >Home</sui-menu-item> 
      </router-link>
      
      
      <sui-menu-item>Movie</sui-menu-item> 
      

      <sui-menu-item @click="logOut">Logout</sui-menu-item> 
      
      <sui-menu-item position  = "right" > <sui-icon name="users" /></sui-menu-item>
      
      
  </div>
  
  <router-view />
  </sui-segment>
  
  <!-- <div class="ui menu">
  <a class="item">Browse</a>
  <a class="item">Submit</a>
  <div class="right menu">
    <a class="item">Sign Up</a>
    <a class="item">Help</a>
  </div> 
</div>-->
  

</template>
<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  name: 'App',
  methods: {
    logOut() {
      const auth = getAuth()
      signOut(auth)
      .then(() => {
          this.$router.replace('/loginpage')
      })
      .catch((error) => {
        alert(error.message)
      })
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>