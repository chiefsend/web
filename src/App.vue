<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
    <Events />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Events from "@/components/Events.vue";

export default {
  components: { Header, Footer, Events },
  name: "App"
};
</script>
