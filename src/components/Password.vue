<template>
  <v-dialog persistent v-model="sheet" max-width="500px">
    <v-card>
      <v-card-text>
        <v-alert dense type="error">Password required</v-alert>
        <!-- <v-alert dense type="error">wrong Password</v-alert> -->

        <v-text-field
          :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show_password ? 'text' : 'password'"
          name="input-10-2"
          @click:append="show_password = !show_password"
        ></v-text-field>

        <v-row>
          <v-col>
            <v-btn block color="secondary" @click="$emit('close')"
              >Cancel</v-btn
            >
          </v-col>
          <v-col>
            <v-btn block color="primary" @click="$emit('password', password)"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
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
