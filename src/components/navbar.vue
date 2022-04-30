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

                 <!-- <router-link to="/about">
                    <sui-menu-item style="color:white;">About</sui-menu-item>
                </router-link> -->

                <!-- <router-link :to = "{path: 'searchgenre', name: 'searchgenre', params: {genre: 'Comedy'}}"> -->
                <sui-dropdown style="color:white" item text="Genre" v-model="this.selectGenre">
                    <sui-dropdown-menu>
                        <sui-dropdown-item v-on:click="searchGenre('action')" text="Action" />
                        <sui-dropdown-item v-on:click="searchGenre('adventure')" text="Adventure" />
                        <sui-dropdown-item v-on:click="searchGenre('comedy')" text="Comedy" />
                        <sui-dropdown-item v-on:click="searchGenre('crime')" text="Crime" />
                        <sui-dropdown-item v-on:click="searchGenre('fantasy')" text="Fantasy" />
                        <sui-dropdown-item v-on:click="searchGenre('horror')" text="Horror" />
                        <sui-dropdown-item v-on:click="searchGenre('romance')" text="Romance" />
                        <sui-dropdown-item v-on:click="searchGenre('sci-fi')" text="Sci-fi" />
                        <sui-dropdown-item v-on:click="searchGenre('thriller')" text="Thriller" />
                        
                    </sui-dropdown-menu>
                </sui-dropdown> 
                <!-- </router-link> -->
            </sui-menu-item>

            <!-- <sui-menu-item>
                <router-link :to = "{path: 'searchgenre', name: 'searchgenre', params: {genre: 'Comedy'}}">
                <sui-dropdown style="color:white" item text="Genre" v-model="this.selectGenre" :options="[
                        
                            {
                            text: 'Comedy',
                            value: 'Comedy',
                            label: { color: 'red', empty: true, circular: true }
                            },
                            {
                            text: 'Sci-fi',
                            value: 'Sci-fi',
                            label: { color: 'blue', empty: true, circular: true }
                            },
                            {
                            text: 'Romance',
                            value: 'Romance',
                            label: { color: 'black', empty: true, circular: true }
                            },
                            {
                            text: 'Action',
                            value: 'Action',
                            label: { color: 'purple', empty: true, circular: true }
                            },
                            {
                            text: 'Drama',
                            value: 'Drama',
                            label: { color: 'orange', empty: true, circular: true }
                            },
                            {
                            text: 'Fantasy',
                            value: 'Fantasy',
                            label: { color: 'gray', empty: true, circular: true }
                            },
                            {
                            text: 'Horror',
                            value: 'Horror',
                            label: { color: 'yellow', empty: true, circular: true }
                            },
                            {
                            text: 'Crime',
                            value: 'Crime',
                            label: { color: 'pink', empty: true, circular: true }
                            },
                            {
                            text: 'Adventure',
                            value: 'Adventure',
                            label: { color: 'green', empty: true, circular: true }
                            },
                            {
                            text: 'Thriller',
                            value: 'Thriller',
                            label: { color: 'brown', empty: true, circular: true }
                            }
                        ]" />
                    </router-link>
            </sui-menu-item> -->
        </sui-menu>

        <sui-menu-item position="right">
            <sui-dropdown icon="user" button pointing="top right">
                <sui-dropdown-menu>
                    <sui-dropdown-item v-on:click="logout" text="Logout" />
                    <sui-dropdown-item v-on:click="profile" text="Profile" />
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
            selectGenre: ''
        }
    },
    methods: {
        searchGenre(genre) {
            this.$router.replace('/searchgenre/' + genre)
        },
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
