<template>
  <div id="container" style="position:relative;">
    <p style="background-image: url('https://img5.goodfon.com/original/1920x1080/c/af/sssssss-aaaaaaaaaaa-ddddddddd-fffffffff-rrrrrrr.jpg');postition:absolute;margin:0px;padding:0px;height:100vh;filter:brightness(30%);background-size: auto;"></p>
    <div style="background-color:#363636;padding:50px;position:absolute;width: 35rem;top: 50%; left: 50%; transform: translate(-50%, -50%);">
      <div id="success" class="container" style="width:300px;height:300px;border-radius:100%;border-style:solid hidden hidden solid;border-color:crimson;border-width: 5px;">
        <div id="tick" style="position:absolute;width:60px;height:20px;background-color:crimson; margin-top:150px;margin-left:63px;transform:rotate(45deg)"></div>
        <div id="tick" style="position:absolute;width:150px;height:20px;background-color:crimson; margin-top:130px;margin-left:90px;transform:rotate(135deg)"></div>
      </div>
      <br><br>
      <div class="container">
        <h2 style="color:white;text-align:center;color:crimson">Create account successfully</h2>
        <br><br>
        <button class="ui button" type="submit" @click.prevent="backToLogin" style="background-color:crimson; color:white;box-shadow:3px 3px #a7112f; width:100%;font-size:20px">Sign In</button>
      </div>
      
    </div>
  </div>
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
#success{
  animation: success 1s ease forwards;
}

#tick{
  animation: tick 1.5s ease forwards;
}

@keyframes success {
  0%{transform: rotate(0deg);}
  20%{transform: rotate(0deg);}
  100%{transform: rotate(360deg);}
}

@keyframes tick {
  0%{opacity: 0;}
  75%{opacity: 0;}
  100%{opacity: 1;}
}
</style>