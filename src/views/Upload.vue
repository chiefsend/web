<template>
  <v-container>
    <p>Upload</p>

    <v-stepper>
      <v-stepper-header>
        <v-stepper-step step="1">
          Select
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">
          Upload
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Share
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1"><SelectStep /></v-stepper-content>
        <v-stepper-content step="2"><UploadStep /></v-stepper-content>
        <v-stepper-content step="3"><ShareStep /></v-stepper-content>
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
    return {};
  }
};
</script>
