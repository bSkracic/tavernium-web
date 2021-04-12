<template>
  <b-card
    :title="campaign.title"
    :sub-title="campaign.owner"
    :img-src="campaign.image"
    img-alt="Campaign Image"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
      {{ campaign.thematics }}
    </b-card-text>
    <b-button variant="danger" v-on:click="joinCampaign">Join</b-button>
  </b-card>
</template>

<script>
export default {
  name: "CampaignCard",
  props: {
    campaign: Object,
  },
  methods: {
    launchCampaign() {
      // TODO: send request for creating room
      alert(`Launching campaign with and ID: ${this.campaign.id}...`);
    },
    joinCampaign() {
      // TODO: join existing room
      this.$router.push("/room");
      alert(`Joining campaign with and ID: ${this.campaign.id}...`);
    },
  },
};
</script>

<style scoped>
</style>