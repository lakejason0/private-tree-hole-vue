<template>
    <v-speed-dial
        bottom right
        fixed
    >
        <template v-slot:activator>
            <v-btn
                fab
                :color="$vuetify.theme.dark ? 'dark' : 'accent'"
            >
                <v-icon>edit</v-icon>
            </v-btn>
        </template>
    </v-speed-dial>
</template>
