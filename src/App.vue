<template>
  <div id="app">
    <div id="nav">
      <img src="./assets/tavernium_icon.png" />
      <h1> Tavernium</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
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
  font-family: fantasy;
}

#nav > img {
  max-height: 50px;
  max-width: 50px;
}
</style>
