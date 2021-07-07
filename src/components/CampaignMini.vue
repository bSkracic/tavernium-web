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
      <b-button
        @click="selectSheet"
        href="#"
        style="background-color: #4b4a67"
        :disabled="campaign.joined"
        class="float-right"
        >{{ buttonText }}</b-button
      >
    </b-card-body>
    <b-modal
      :id="'join-campaign-' + campaign.id"
      :title="'Join ' + campaign.title + '?'"
      hide-footer
    >
    <div>
      <p v-if="sheetOptions.length > 0">
        Join campaign with following character sheet:
      </p>
    </div>
      <div class="flex" style="display: flex; justify-content: center; align-items: center;">
        <b-form-select
          v-if="sheetOptions.length > 0"
          style="width: 50%"
          v-model="selectedSheet"
          :options="sheetOptions"
        ></b-form-select>
        <div v-else>
          <b-icon icon="exclamation-triangle-fill"></b-icon>
          You didn't create any character sheets, so please create one before joining!
        </div>
      </div>
      <b-button class="mt-2" style="background-color: #4b4a67;" block @click="joinCampaign" :disabled="sheetOptions.length === 0"
        >Join</b-button>
    </b-modal>
  </b-card>
</template>

<script>
import rest from "../axios/rest";

export default {
  name: "CampaignMini",
  props: {
    campaign: Object,
  },
  methods: {
    selectSheet() {
      this.$bvModal.show(`join-campaign-${this.campaign.id}`);
      rest.restrictedRequest(this, "GET", "/sheets/user", null, (res) => {
        this.sheetOptions = res.data.map((s) => {
          return {
            value: s.id,
            text: s.name,
          };
        });
        if(this.sheetOptions.length > 0) {
          this.selectedSheet = this.sheetOptions[0].value;
        }
      });
    },
    joinCampaign() {
      rest.restrictedRequest(
        this,
        "POST",
        "/campaign/join",
        {
          sheet_id: this.selectedSheet,
          campaign_id: this.campaign.id,
        },
        () => {
          this.$cookies.set("IS_DM", false);
          this.$cookies.set("ROOM_ID", this.campaign.id);
          this.$router.push("room");
        }
      );
    },
  },
  data() {
    return {
      buttonText: "",
      selectedSheet: 0,
      sheetOptions: [],
    };
  },
  created() {
    this.buttonText = this.campaign.joined ? "Joined" : "Join";
  },
};
</script>

<style scoped>
</style>