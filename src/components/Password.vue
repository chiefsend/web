<template>
  <v-bottom-sheet persistent inset v-model="sheet">
    <v-card>
      <v-alert>Password required</v-alert>
      <v-text-field
        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show_password ? 'text' : 'password'"
        name="input-10-2"
        @click:append="show_password = !show_password"
      ></v-text-field>

      <v-btn color="secondary" @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="$emit('password', password)">Submit</v-btn>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "Password",
  props: {
    sheet: Boolean,
    id: String
  },
  data() {
    return {
      show_password: false,
      password: ""
    };
  }
};
</script>
