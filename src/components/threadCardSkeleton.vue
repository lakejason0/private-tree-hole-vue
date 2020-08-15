<template>
  <v-card class="mx-auto">
    <!--<v-card-title>
            <span class="title font-weight-light">{{ threadData.title }}</span>
        </v-card-title>-->
    <v-card-text class="headline font-weight-regular">
      <v-skeleton-loader type="paragraph" class="mx-auto"></v-skeleton-loader>
    </v-card-text>
    <v-card-actions>
      <v-list-item class="grow">
        <v-icon class="mr-1">mdi-account-circle</v-icon>
        <v-list-item-content>
          <v-list-item-title
            ><v-skeleton-loader
              type="heading"
              class="mx-auto"
            ></v-skeleton-loader
          ></v-list-item-title>
        </v-list-item-content>
        <v-row align="center" justify="end">
          <v-icon class="mr-1">mdi-clock</v-icon>
          <span class="subheading mr-2"
            ><v-skeleton-loader type="text" class="mx-auto"></v-skeleton-loader
          ></span>
          <!--<span class="mr-1">·</span>-->
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
