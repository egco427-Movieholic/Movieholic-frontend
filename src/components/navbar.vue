<template>
    <sui-menu size="big" style="background-color : black">
        <sui-menu style="background-color : black">
            <sui-menu-item>
                <router-link to="/movielist">
                <sui-image
                    src="https://cdn.discordapp.com/attachments/942449556895985674/967704933082214491/large_movieholic_resize_white.png"
                    size="small" />
                       </router-link>
            </sui-menu-item>
         
            <sui-menu-item>

                <sui-dropdown style="color:white" item text="Genre" v-model="this.selectGenre">
                    <sui-dropdown-menu>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'action'}}">
                        <sui-dropdown-item text="Action" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'Adventure'}}">
                        <sui-dropdown-item text="Adventure" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'comedy'}}">
                        <sui-dropdown-item text="Comedy" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'crime'}}">
                        <sui-dropdown-item text="Crime" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'fantasy'}}">
                        <sui-dropdown-item text="Fantasy" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'horror'}}">
                        <sui-dropdown-item text="Horror" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'romance'}}">
                        <sui-dropdown-item text="Romance" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'sci-fi'}}">
                        <sui-dropdown-item text="Sci-fi" />
                        </router-link>
                        <router-link style="text-decoration: none; color: inherit;" :to="{path: 'searchgenre', name: 'searchGenre', params:{genre: 'thriller'}}">
                        <sui-dropdown-item text="Thriller" />
                        </router-link>
                        
                    </sui-dropdown-menu>
                </sui-dropdown> 
            </sui-menu-item>

        </sui-menu>

        <sui-menu-item position="right">
            <sui-dropdown icon="user" button pointing="top right">
                <sui-dropdown-menu>
                    <sui-dropdown-item v-on:click="profile" text="Profile" />
                    <sui-dropdown-item v-on:click="logout" text="Logout" />
                </sui-dropdown-menu>
            </sui-dropdown>
        </sui-menu-item>


    </sui-menu>



</template>


<script>
import { getAuth , signOut } from 'firebase/auth'
export default {
    name: "navbar",
    data() {
        return{
            
        }
    },
    methods: {
        logout() {
            const auth = getAuth()
            signOut(auth)
            .then(() => {
                this.$router.replace('/signin')
            })
            .catch((error) => {
                alert(error.message)
            })
        },
        
        profile() {
           this.$router.replace('/profile')
        
        }
     },
     
    
}       


</script>


<style>


</style>
