<template>
  <v-dialog persistent v-model="dialog" max-width="500px">
    <v-card>
      <v-card-text class="pt-4">
        <v-alert dense type="error" v-if="wrongPassword"
          >Wrong Password!</v-alert
        >
        <v-alert dense type="error" v-else>Password required!</v-alert>

        <v-form @submit="submit()" onSubmit="return false;">
          <v-text-field
            autofocus
            v-model="password"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            @click:append="show_password = !show_password"
          ></v-text-field>

          <v-row>
            <v-col>
              <v-btn block color="secondary" @click="close()">Cancel</v-btn>
            </v-col>
            <v-col>
              <v-btn block color="primary" @click="submit()">Submit</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Password",
  props: {
    dialog: Boolean,
    id: String,
    wrongPassword: Boolean
  },
  data() {
    return {
      show_password: false,
      password: ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("password", this.password);
    }
  }
};
</script>
