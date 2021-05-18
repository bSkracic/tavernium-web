<template>
  <b-card style="max-width: 100%" title="Register a free account">
    <b-card-body>
      <div class="container-form">
        <b-alert :show="registerFailed" variant="danger"
          >Invalid mail address.</b-alert>
        <div>
          <input type="text" placeholder="username" v-model="username" />
        </div>
        <div>
          <input type="text" placeholder="mail..." v-model="mail" />
        </div>
        <div>
          <input type="password" placeholder="password..." v-model="password" />
        </div>
        <div>
          <b-button class="btn btn-danger" v-on:click="register"
            >Create an account!</b-button
          >
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import rest from "../axios/rest.js";

export default {
  name: "RegisterForm",
  data() {
    return {
      username: "",
      mail: "",
      password: "",
      registerFailed: false,
    };
  },
  methods: {
    register() {
      rest.axiosInstanceAuth
        .post("/register", {
          username: this.username,
          mail: this.mail,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/homepage');
        }).catch(() => {
          this.registerFailed = true;
        })
    },
  },
};
</script>

<style scoped>
.container-form > div {
  display: flex;
  justify-content: center;
  padding: 5px;
  margin: 5px;
}
.container-form > div > input {
  border-radius: 3%;
}
.container-form > div > * {
  width: 100%;
  padding: 5px;
}
</style>
