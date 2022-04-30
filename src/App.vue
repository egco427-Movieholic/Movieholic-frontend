<template>

    <div style="margin-top:-20px"></div>
    <link href="https://unpkg.com/vueperslides/dist/vueperslides.css" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Bungee Inline' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Krona One' rel='stylesheet'>

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