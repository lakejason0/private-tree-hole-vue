<template>
    <div style="position: fixed; bottom: 16px; left: 0; right: 0;">
        <v-toolbar
            dense
            floating
            style="margin: 0 auto;"
        >
            <v-text-field
            hide-details
            prepend-icon="search"
            single-line
            ></v-text-field>

            <v-btn icon>
            <v-icon>my_location</v-icon>
            </v-btn>

            <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
export default {
    
}
</script>