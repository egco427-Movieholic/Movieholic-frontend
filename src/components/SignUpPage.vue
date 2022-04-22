/<template>
  <div class="card mx-auto" style="width: 35rem;" >
  <sui-grid-column>
    <sui-segment raised>

      <div class="ui teal segment">
         <sui-label ribbon color="teal">Login</sui-label>
      </div>
      
      <form class="ui form">
        <div class="field">
          <label><b>Username</b></label>
             <input type="text" v-model="User.username" placeholder="Username">
        </div>

        <div class="field">
          <label><b>Email</b></label>
             <input type="text" v-model="User.email" placeholder="Email">
        </div>

        <div class="field">
          <label><b>Password</b></label>
            <input type="password" v-model="User.password" placeholder="Password">
        </div>
 
            <button class="ui button" type="submit" @click.prevent="signUp">Create Accout</button>
            <button class="ui button" type="submit" >Back</button>
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
        password: ''
      }
    }
  },
  methods: {
    signUp(){
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.User.email, this.User.password)
      .then((user) =>{

        updateProfile(auth.currentUser, {displayName: this.User.username})
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

</style>