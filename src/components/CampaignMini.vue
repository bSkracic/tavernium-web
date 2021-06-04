<template>
  <b-card
    img-alt="Image"
    img-left
    style="max-width: 30rem; min-width: 20rem"
    class="mb-2"
  >
    <b-card-body class="clearfix">
      <b-card-text class="float-left">
        <b-card-title>{{ campaign.title }}</b-card-title>
        <b-card-sub-title>by {{ campaign.username }}</b-card-sub-title>
      </b-card-text>
      <!-- <b-button
        href="#"
        :variant="campaign.joined ? 'info' : 'danger'"
        :disabled="campaign.joined"
        v-on:click="joinCampaign()"
        class="float-right"
        >{{buttonText}}</b-button
      > -->
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: "CampaignMini",
  props: {
    campaign: Object,
  },
  methods: {
    joinCampaign() {
      console.log(this.campaign.joined);
    },
  },
  data() {
    return {
      buttonText: "",
    }
  },
  created() {
    this.buttonText = this.campaign.joined ? "Joined" : "Join";
  }
};
</script>

<style scoped>
</style>