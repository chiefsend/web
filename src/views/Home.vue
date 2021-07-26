<template>
  <v-row align="center" justify="center" class="cover white--text">
    <v-col class="text-center cover-content" cols="12">
      <h1 class="text-h4 font-weight-thin mb-4">
        ChiefSend
      </h1>

      <h4 class="subheading mb-8">
        Upload your files!
      </h4>

      <v-btn block color="secondary" to="/public" class="ma-2">
        public
        <v-icon right>
          mdi-earth
        </v-icon>
      </v-btn>

      <v-btn block color="success" to="/upload" class="ma-2">
        Upload
        <v-icon right>
          mdi-cloud-upload
        </v-icon>
      </v-btn>

      <h6 class="my-4">OR</h6>

      <v-form @submit="search()" onSubmit="return false;">
        <v-text-field
          v-model="query"
          label="Search for a Share"
          outlined
          dense
        ></v-text-field>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      query: ""
    };
  },
  methods: {
    search() {
      if (this.query.length <= 0) return;

      const split = this.query.split("/");
      let id = split[split.length - 1];
      this.$router.push({ name: "Download", params: { id: id } });
    }
  }
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

.cover-content {
  max-width: 400px;
}
</style>
