<template>
  <div class="container">
    <b-card
    title="Sign in"
    style="max-width: 100%;"
  >
    <b-card-body>
      <div class="container-form">
      <div>
        <input type="text" placeholder="mail..." v-model="mail" />
      </div>
      <div>
        <input type="password" placeholder="password..." v-model="password" />
      </div>
      <div>
        <b-button class="btn btn-danger" v-on:click="login">Log in!</b-button>
      </div>
    <div>
    <div>
      <label>Logging in with IP: <strong>{{ip}}</strong></label>
    </div>
    </div>
        Not registered?
        <br>
        <router-link style="color: red;" to='/homepage'>Create an account!</router-link>
    </div>
    </b-card-body>
  </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "LoginForm",
  methods: {
    login() {
      // const loginRequest = {
      //   username: this.username,
      //   mail: this.password
      // }
      // axios.post('https://example.url', loginRequest)
      //   .then(result => {
      //     if(result.data.response == -1)
      //   }, error => {
      //     if error.data.co
      //   })
      // this.$cookies.set('AUTH_SAVED', true)
      this.$router.push("/homepage");
    },
  },
  data() {
    return {
      password: "",
      mail: "",
      ip: ""
    };
  },
  mounted() {
     axios({method: "GET", url: 'https://httpbin.org/ip'})
        .then( result => {
          this.ip = result.data.origin;
      }, error => {
          this.ip = error;
      })
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.container-form > div {
  display: flex;
  justify-content: center;
  padding: 5px;
}
.container-form > div > input {
  border-radius: 3%;
}
.container-form > div > * {
  width: 100%;
  padding: 5px;
}
</style>
