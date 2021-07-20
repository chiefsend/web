<template>
  <v-footer padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Chief</strong>
      -
      <router-link to="/imprint">
        Imprint
      </router-link>
      -
      <router-link to="/privacy">
        Privacy
      </router-link>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
