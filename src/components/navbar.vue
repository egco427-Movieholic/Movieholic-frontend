<template>

    <sui-menu size="big" inverted>
        <sui-menu inverted>
            <sui-menu-item>
                <sui-image
                    src="https://cdn.discordapp.com/attachments/942449556895985674/967704933082214491/large_movieholic_resize_white.png"
                    size="small" />
            </sui-menu-item>
            <sui-menu-item>Home</sui-menu-item>

            <sui-menu-item>
                <sui-dropdown item text="Genre" floating labeled button searchInMenu v-model="selected7" :options="[
                            {
                            text: 'Comedy',
                            value: 'Comedy',
                            label: { color: 'red', empty: true, circular: true },
                            },
                            {
                            text: 'Sci-fi',
                            value: 'Sci-fi',
                            label: { color: 'blue', empty: true, circular: true },
                            },
                            {
                            text: 'Romance',
                            value: 'Romance',
                            label: { color: 'black', empty: true, circular: true },
                            },
                            {
                            text: 'Action',
                            value: 'Action',
                            label: { color: 'purple', empty: true, circular: true },
                            },
                            {
                            text: 'Drama',
                            value: 'Drama',
                            label: { color: 'orange', empty: true, circular: true },
                            },
                            {
                            text: 'Fantasy',
                            value: 'Fantasy',
                            label: { color: 'gray', empty: true, circular: true },
                            },
                            {
                            text: 'Horror',
                            value: 'Horror',
                            label: { color: 'yellow', empty: true, circular: true },
                            },
                            {
                            text: 'Crime',
                            value: 'Crime',
                            label: { color: 'pink', empty: true, circular: true },
                            },
                            {
                            text: 'Adventure',
                            value: 'Adventure',
                            label: { color: 'green', empty: true, circular: true },
                            },
                            {
                            text: 'Thriller',
                            value: 'Thriller',
                            label: { color: 'brown', empty: true, circular: true },
                            }
                        ]" />
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

</template>