<template>
  <v-container>
    <p>Upload</p>

    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="step > 1">
          Select
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2" :complete="step > 2">
          Upload
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Share
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <SelectStep @done="selectToUpload" ref="select" />
        </v-stepper-content>
        <v-stepper-content step="2">
          <UploadStep @done="uploadToShare" ref="upload" />
        </v-stepper-content>
        <v-stepper-content step="3">
          <ShareStep ref="share" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import SelectStep from "@/components/SelectStep";
import UploadStep from "@/components/UploadStep";
import ShareStep from "@/components/ShareStep";

export default {
  name: "Upload",
  components: { SelectStep, UploadStep, ShareStep },
  data() {
    return {
      step: 1
    };
  },
  methods: {
    selectToUpload(share, files) {
      this.$refs.upload.uploadAll(share, files);
      this.step++;
    },
    uploadToShare(share) {
      this.$refs.share.generateLinks(share);
      this.step++;
    }
  }
};
</script>
