<template>
  <div class="container">
    <b-tabs
      content-class="mt-3"
      align="center"
      active-nav-item-class="font-weight-bold text-danger"
    >
      <b-tab title="Sign in" :title-link-class="'inactive-nav-title'">
        <b-card style="max-width: 100%" title="Log into your account">
          <b-card-body>
            <div class="container-form">
              <div>
                <b-alert :show="loginFailed" variant="danger"
                  >Invalid mail or password.</b-alert
                >
              </div>
              <div>
                <input type="text" placeholder="mail..." v-model="mail" />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="password..."
                  v-model="password"
                />
              </div>
              <div>
                <b-form-checkbox v-model="saveCredentials"
                  >Remember me</b-form-checkbox
                >
              </div>
              <div>
                <b-button class="btn btn-danger" v-on:click="login"
                  >Log in!</b-button
                >
              </div>
              <div>
                <div>
                  <label
                    >Logging in with IP: <strong>{{ ip }}</strong></label
                  >
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-tab>
      <b-tab title="Register" :title-link-class="'inactive-nav-title'">
        <RegisterForm />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from "axios";
import rest from "../axios/rest";
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "LoginForm",
  components: { RegisterForm },
  methods: {
    login() {
      rest.axiosInstanceAuth
        .post("/login", {
          email: this.mail,
          password: this.password,
          remember: this.saveCredentials,
        })
        .then(
          (result) => {
            if (result.status === 200) {
              if (this.saveCredentials) {
                this.$cookies.set("REFRESH_TOKEN", result.data.refresh_token);
              }
              this.$cookies.set("ACCESS_TOKEN", result.data.access_token);
              this.$cookies.set("USERNAME", result.data.username);
              this.$cookies.set("USER_ID", result.data.user_id); 
              this.loginFailed = false;
              this.$router.push("/homepage");
            }
          },
          () => {
            this.loginFailed = true;
          }
        );
    },
  },
  data() {
    return {
      password: "",
      mail: "",
      ip: "",
      loginFailed: false,
      saveCredentials: false,
    };
  },
  mounted() {
    axios({ method: "GET", url: "https://httpbin.org/ip" }).then(
      (result) => {
        this.ip = result.data.origin;
      },
      (error) => {
        this.ip = error;
      }
    );
  },
};
</script>

<style>
.inactive-nav-title {
  color: black !important;
}
</style>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
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
