<template>
  


  <router-view />
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