<template>
  <div>
    <h6><strong>{{ message.sender }}</strong>:</h6>
    <p style="font-size: 15px;">{{ message.content }}</p>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    message: Object,
  },
};
</script>

<style scoped>
div {
    padding: 1vh;
}
</style>