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

            
                <sui-menu-item style="color:white">About</sui-menu-item>
         

            <sui-menu-item>
                <!-- <router-link :to = "{path: 'searchgenre', name: 'searchgenre', params: {genre: 'Comedy'}}"> -->
                <sui-dropdown style="color:white" item text="Genre" floating labeled button searchInMenu v-model="this.selectGenre" :options="[
                        
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
                    <!-- </router-link> -->
            </sui-menu-item>
        </sui-menu>

        <sui-menu-item position="right">
            <sui-dropdown icon="user" button pointing="top right">
                <sui-dropdown-menu>
                    <sui-dropdown-item text="Profile" />
                    <sui-dropdown-item text="Logout" />
                </sui-dropdown-menu>
            </sui-dropdown>
        </sui-menu-item>


    </sui-menu>

    <p>
        {{this.selectGenre}}
        </P>

</template>


<script>

export default {
 name: "navbar",
    data() {
        return{
            selectGenre: ''
        }
    },
     methods: {
        searchGenre(){
            console.log(this.selectGenre)
        } 
     }
}       


</script>
