<template>
  <b-card
    img-alt="Image"
    img-left
    tag="campaign"
    style="width: 100%"
  >
    <b-card-body class="clearfix">
      <b-card-text class="float-left">
        <b-card-title>{{ campaign.title }}</b-card-title>
        <b-card-sub-title>by {{ campaign.username }}</b-card-sub-title>
      </b-card-text>
      <b-button
        href="#"
        variant="danger"
        :disabled="campaign.joined"
        v-on:click="joinCampaign()"
        class="float-right"
        >Join</b-button
      >
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

    },
  },
};
</script>

<style scoped>
</style>