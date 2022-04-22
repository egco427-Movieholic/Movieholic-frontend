<template>
  <h1>Sign Up Success</h1>
  <button class="ui button" type="submit" @click.prevent="backToLogin">Back Login</button>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'

export default {
  name: 'App',
  methods: {
    backToLogin() {
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

</style>