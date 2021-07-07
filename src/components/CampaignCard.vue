<template>
  <b-card
    :title="campaign.title"
    :sub-title="campaign.owner"
    :img-src="campaign.image"
    img-alt="Campaign Image"
    img-top
    style="max-width: 30rem; min-width: 20rem"
    class="mb-2"
  >
    <b-card-body>
      <b-card-text>
        {{ campaign.thematics }}
      </b-card-text>
      <b-card-body> </b-card-body>
      <div></div>
    </b-card-body>
    <b-card-footer>
      <div class="flex" style="display: flex; justify-content: space-between">
        <b-button
          v-if="isDM"
          variant="outline-danger"
          class="float-left"
          style="width: 25%"
          @click="showDeleteModal"
          ><b-icon icon="trash-fill"></b-icon
        ></b-button>
        <b-button
          v-if="isDM"
          style="background-color: #7e8987; width: 25%"
          class="float-right"
          @click="showEditModal"
          ><b-icon icon="pencil-fill"></b-icon
        ></b-button>
        <b-button
          style="background-color: #7e8987; width: 25%"
          @click="joinRoom"
          ><b-icon icon="play-circle"></b-icon
        ></b-button>
      </div>
    </b-card-footer>
    <b-modal
      :id="'delete-campaign-' + campaign.id"
      :title="'Delete ' + campaign.title + '?'"
      hide-footer
    >
      <p>Are you sure wnat to delete this campaign?</p>
      <b-button class="mt-2" variant="danger" block @click="deleteCampaign"
        >Delete</b-button
      >
    </b-modal>
    <b-modal
      :id="'edit-campaign-' + campaign.id"
      :title="'Edit ' + campaign.title"
      hide-footer
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Title" invalid-feedback="Title is  required">
          <b-form-input v-model="campaignCopy.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Thematics">
          <b-form-input v-model="campaignCopy.thematics"></b-form-input>
        </b-form-group>
        <b-button
          class="mt-2"
          block
          style="background-color: #4b4a67;"
          @click="editCampaign"
          >Save</b-button
        >
      </form>
    </b-modal>
  </b-card>
</template>

<script>
import rest from "../axios/rest";

export default {
  name: "CampaignCard",
  props: {
    isDM: Boolean,
    campaign: Object,
  },
  data() {
    return {
      campaignCopy: null,
    };
  },
  created() {
    this.campaignCopy = JSON.parse(JSON.stringify(this.campaign));
  },
  methods: {
    showEditModal() {
      this.$bvModal.show(`edit-campaign-${this.campaign.id}`);
      this.campaignCopy = JSON.parse(JSON.stringify(this.campaign));
    },
    showDeleteModal() {
      this.$bvModal.show(`delete-campaign-${this.campaign.id}`);
    },
    deleteCampaign() {
      rest.restrictedRequest(
        this,
        "DELETE",
        "/campaign/edit",
        { id: this.campaign.id },
        () => {
          this.$emit("campaign-event", this.campaign, "deleted");
          this.$bvModal.hide(`delete-campaign-${this.campaign.id}`);
        }
      );
    },
    editCampaign() {
      this.campaignCopy.id = this.campaign.id;

      rest.put('/campaign/edit', this.campaignCopy).then(() => {
        this.$emit("campaign-event", this.campaignCopy, 'modified')
        this.$bvModal.hide(`edit-campaign-${this.campaign.id}`);
      })
    },
    joinRoom() {
      this.$cookies.set("IS_DM", this.isDM);
      this.$cookies.set("ROOM_ID", this.campaign.id);
      this.$router.push("/room");
    },
  },
};
</script>

<style scoped>
</style>