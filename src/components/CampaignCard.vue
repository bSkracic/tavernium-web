<template>
  <b-card
    :title="campaign.title"
    :sub-title="campaign.owner"
    :img-src="campaign.image"
    img-alt="Campaign Image"
    img-top
    tag="article"
    style="max-width: 30rem; min-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
      {{ campaign.thematics }}
    </b-card-text>
    <b-button v-if="isDM"  variant="danger" style="width: 100%" @click="enterGame"
      >Enter game</b-button
    >
    <b-button v-if="!isDM" v-b-modal.choose-cs variant="danger">Enter game</b-button>
    <b-modal id="choose-cs" title="Choose character sheet to use in this campaign" hide-footer>
      <b-form-select style="width: 50%" v-model="selectedCharacterSheet" :options="characterSheets"></b-form-select>
      <br>
      <div class="clearfix">
        <b-button class="float-right" variant="danger" v-on:click="enterGame">Enter!</b-button>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
export default {
  name: "CampaignCard",
  props: {
    characterSheets: Array,
    isDM: Boolean,
    campaign: Object,
  },
  data() {
    return {
     selectedCharacterSheet: null,
    }
  },
  methods: {
    enterGame() {
      this.$cookies.set("ROOM_ID", this.campaign.id);
      console.log(this.campaign);
      this.$router.push({
        name: "room",
        params: { roomID: this.campaign.id, isUserDM: this.isDM },
      });
    },
  },
};
</script>

<style scoped>
</style>