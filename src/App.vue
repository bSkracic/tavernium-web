<template>
  <div id="app">
    <router-view v-on:roomOpened="roomOpened($event)"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      userID: "",
      navVisible: true
    }
  },
  methods: {
    roomOpened(v) {
      this.navVisible = v;
    }
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
}

#nav > img {
  max-height: 50px;
  max-width: 50px;
}
</style>
