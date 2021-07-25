<template>
  <v-row align="center" justify="center" class="cover white--text">
    <v-col class="text-center" cols="12">
      <h1 class="text-h4 font-weight-thin mb-4">
        ChiefSend
      </h1>
      <h4 class="subheading mb-8">
        Upload your files!
      </h4>
      <v-btn color="secondary" to="/public" class="mx-2">
        public
        <v-icon right>
          mdi-earth
        </v-icon>
      </v-btn>
      <v-btn color="success" to="/upload" class="mx-2">
        Upload
        <v-icon right>
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.cover {
  min-height: 100%;
  height: 100%;
  background-image: url("https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg");
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style>
