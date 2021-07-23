<template>
  <v-card>
    <v-card-title>Share your Files</v-card-title>
    <v-card-text>
      <v-text-field
        :value="url"
        append-icon="mdi-clipboard-outline"
        @click:append="copyUrl"
        readonly
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ShareStep",
  data() {
    return {
      share: {}
    };
  },
  methods: {
    generateLinks(share) {
      this.share = share;
    },
    copyUrl() {
      const el = document.createElement("textarea");
      el.value = this.url;
      document.body.appendChild(el);
      el.select();
      el.setSelectionRange(0, 999);
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  },
  computed: {
    url: function() {
      return `${window.location.origin}/d/${this.share.id}`;
    }
  }
};
</script>
